import assert from "node:assert/strict"
import test from "node:test"

import { normalizePagePath, pageUrl } from "./urls.ts"

test("normalizes page paths to the trailing-slash policy", () => {
  assert.equal(
    normalizePagePath("coding-with-llms-2026"),
    "/coding-with-llms-2026/"
  )
  assert.equal(
    normalizePagePath("/coding-with-llms-2026"),
    "/coding-with-llms-2026/"
  )
  assert.equal(
    normalizePagePath("/coding-with-llms-2026/"),
    "/coding-with-llms-2026/"
  )
  assert.equal(normalizePagePath("/"), "/")
})

test("builds canonical page URLs without duplicate slashes", () => {
  assert.equal(
    pageUrl("https://boredhacking.com", "/coding-with-llms-2026"),
    "https://boredhacking.com/coding-with-llms-2026/"
  )
  assert.equal(
    pageUrl("https://boredhacking.com/", "/coding-with-llms-2026/"),
    "https://boredhacking.com/coding-with-llms-2026/"
  )
})
