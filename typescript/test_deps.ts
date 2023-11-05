import * as Toml from "https://deno.land/std@0.109.0/encoding/toml.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.109.0/path/mod.ts";

export * from "https://deno.land/std@0.205.0/assert/mod.ts";
export * from "https://deno.land/std@0.205.0/testing/bdd.ts";

export async function readTestCases(name: string) {
  const currentDir = dirname(fromFileUrl(import.meta.url));
  const filePath = join(currentDir, "..", "testdata", name, "test_cases.toml");
  const file = await Deno.readTextFile(filePath);
  return Toml.parse(file);
}
