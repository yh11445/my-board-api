import { I18nContext } from "nestjs-i18n";

import * as fs from "fs";
import * as path from "path";

// getMessage("file.notfound", { args: { fieldname: "test" } });
// @IsNotEmpty({ message: params => getMessage("file.notfound", { args: params }) })
export const getMessage = (key: string, options?: { args?: any; lang?: string }) => {
  const i18n = I18nContext.current();
  const lang = options?.lang || i18n?.lang;
  const args = options?.args;
  if (i18n) {
    return i18n.t(key, { args, lang }).toString();
  }
};

export function initI18nResources(fallbackLng: string) {
  const localePath = path.join(process.cwd(), "resources", "lang");
  const files = fs.readdirSync(localePath);
  const preload = files
    .filter((file) => {
      const filePath = path.join(localePath, file);
      return fs.statSync(filePath).isFile();
    })
    .map((name) => name.split(".")[0]);
  const resources = preload
    .map((locale) => ({
      [locale]: { translation: JSON.parse(fs.readFileSync(path.join(localePath, `${locale}.json`), "utf8")) },
    }))
    .reduce((a, b) => ({ ...a, ...b }));
  return { preload, fallbackLng, resources };
}
