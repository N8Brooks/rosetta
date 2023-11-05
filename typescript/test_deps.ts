export * from "https://deno.land/std@0.205.0/assert/mod.ts";
export * from "https://deno.land/std@0.205.0/testing/bdd.ts";
import * as Toml from "https://deno.land/std@0.109.0/encoding/toml.ts";

export async function readTestCases(name: string) {
  const file = await Deno.readTextFile(`../testdata/${name}/test_cases.toml`);
  return Toml.parse(file);
}
