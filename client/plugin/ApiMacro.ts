import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
const traverse = traverseModule.default;
import generateModule from "@babel/generator";
const generate = generateModule.default;

import path from "path";

import * as t from "@babel/types";

export default function ApiMacro() {
  return {
    name: "vite-plugin-auto-api-macro",
    enforce: "post",
    transform(code: string, id: string) {
      if (!id.endsWith(".tsx")) return;

      const ast = parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });

      const apiCalls: { hook: t.Identifier; args?: t.Expression }[] = [];

      traverse(ast, {
        CallExpression(path) {
          const node = path.node;

          // Detect useApi(hook, [args])
          if (
            t.isIdentifier(node.callee, { name: "Api" }) &&
            node.arguments.length >= 1 &&
            t.isIdentifier(node.arguments[0])
          ) {
            const hook = node.arguments[0] as t.Identifier;
            const args = node.arguments[1] ?? null;
            apiCalls.push({ hook, args: args ?? undefined });

            // Replace it with undefined so TS stays happy
            path.replaceWith(t.identifier("undefined"));
          }
        },
      });

      if (apiCalls.length === 0) return;

      // Get the exported component name
      let componentName: string | null = null;
      traverse(ast, {
        ExportNamedDeclaration(path) {
          const decl = path.node.declaration;
          if (t.isVariableDeclaration(decl)) {
            const declarator = decl.declarations[0];
            if (t.isIdentifier(declarator.id)) {
              componentName = declarator.id.name;
            }
          }
        },
      });

      if (!componentName) return;

      // Generate wrappers
      const wrappers = apiCalls.map(({ hook }) => {
        return `
          export const ${componentName}_AutoWrapped = withApiData(${hook.name})(${componentName});
          export default ${componentName}_AutoWrapped;
        `;
      });

      // Compute a relative import path from this file (id) to the project-root plugin directory
      const projectPluginDir = path.resolve(process.cwd(), "plugin");
      const fileDir = path.dirname(id);
      let importPath = path.relative(fileDir, projectPluginDir).replace(/\\/g, "/");
      if (!importPath.startsWith(".")) importPath = `./${importPath}`;

      const importStmt = `import { withApiData } from '${importPath}/withApi';\n`;

      return {
        code: `${importStmt}\n${generate(ast).code}\n${wrappers.join("\n")}`,
        map: null,
      };
    },
  };
}
