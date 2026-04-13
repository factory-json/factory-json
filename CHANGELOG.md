# Changelog

All notable changes to the factory.md specification will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-04-12

### Changed (BREAKING)

- **Format migration**: factory.json is now factory.md — a Markdown file with YAML frontmatter
  - Well-known URI: `/.well-known/factory.md` (was `/.well-known/factory.json`)
  - Content-Type: `text/markdown; charset=utf-8` (was `application/json`)
  - `$schema` replaced by `schema` (no dollar prefix, YAML-friendly)
- **Two-layer architecture**: Structured data in YAML frontmatter (validated by JSON Schema), rich descriptions in Markdown body (recommended sections, not enforced)
- **Minimal frontmatter** (8 fields): `schema`, `name`, `location`, `vertical`, `capabilities`, `certifications`, `website`, `email`. Only `name` and `location` are required.
- **Capabilities simplified**: Only the flat string array form in frontmatter; detailed materials, equipment, finishes, tolerances move to Markdown body
- **Endpoints flattened**: `website` and `email` are top-level frontmatter fields; other endpoints (rfq, mcp, a2a) move to the Markdown body
- **RFQ simplified**: URI and detailed requirements move to Markdown body section
- **A2A references updated**: `metadata.factoryProfile` now points to `factory.md`

### Removed (from schema — moved to Markdown body)

- `$schema` field (replaced by `schema`)
- Structured `capabilities` object form (processes, materials, finishes, equipment)
- `quality`, `engineering`, `shipping`, `payment`, `compliance`, `media`, `business_hours`, `custom`
- `constraints` (MOQ, lead time, tolerances, capacity, dimensions, weight)
- `endpoints` object (rfq, api, mcp, a2a, phone)
- `description`, `legal_name`, `founded_year`, `employees`, `languages`, `industries_served`
- `version` field (schema version now implied by `schema` URI)

### Added

- v2.0 JSON Schema at `schema/v2.0/factory.schema.json` (validates frontmatter only)
- Three example `.md` files across manufacturing verticals
- Recommended Markdown body sections with RFC 2119 language (SHOULD/MAY)
- Non-normative Appendix A with common vertical and capability values
- YAML parsing security guidance (quote country codes, cert types)
- Section 7.1: Migration guidance from v1.x

## [1.3.0] - 2026-04-01

### Changed

- **A2A integration model** — Reframed factory.json as an A2A protocol extension rather than a bridge pattern
  - Agent Card is now the lean interaction entry point; factory.json remains the rich data layer
  - Agent Card links to factory.json via `metadata.factoryProfile` URI reference (replaces embedded data)
  - Registered extension URI: `https://factoryschema.org/a2a-extension/v1`
  - New Section 9.4 (Lean Agent Card Design) — clear guidance on what belongs in the Agent Card vs factory.json
  - Renamed `metadata.factory_json` to `metadata.factoryProfile` for consistency
  - Updated A2A protocol link to `a2a-protocol.org` (now under Linux Foundation)
- **Agent Card example** simplified — removed duplicated manufacturing data, skills reduced to summary level, factory profile referenced by URI

## [1.2.0] - 2026-03-30

### Added

- **RFQ intake requirements** — New optional top-level `rfq` field for declaring what a factory requires in RFQ submissions
  - Shorthand form (URI string) and full object form, following the established schema pattern
  - Sub-fields: `endpoint`, `required_fields`, `required_files`, `accepted_types`, `min_quantity`, `min_order_value`, `nda_required`, `auto_quote`, `notes`
  - Enables AI agents to pre-validate RFQs before submission, reducing `input-required` round-trips
- **Section 4.14: RFQ Requirements** in SPEC.md — Field reference with relationship notes to `endpoints.rfq`, `engineering.file_formats`, and `constraints.moq`
- **v1.2 JSON Schema** (`schema/v1.2/factory.schema.json`) — New schema version accepting `"1.0"`, `"1.1"`, and `"1.2"` version strings
- **A2A mapping** for `rfq.required_fields` → `AgentSkill.inputSchema` and `rfq.required_files` → required input artifact types

### Changed

- Machine shop example updated with full-form `rfq` block
- Agent Card example `rfq-intake` skill updated with `required_fields` and `required_files` metadata

## [1.1.0] - 2026-03-20

### Added

- **A2A (Agent-to-Agent) protocol interoperability** — New optional `endpoints.a2a` field for linking to an A2A Agent Card (`/.well-known/agent-card.json`)
- **Section 9: A2A Interoperability** in SPEC.md — Discovery bridge pattern, semantic mapping from factory.json fields to A2A concepts, industrial task extension for RFQs, and trust/verification guidance
- **Agent Card example** (`examples/agent-card.json`) — Reference A2A Agent Card for the machine shop example, with skills derived from factory capabilities
- **v1.1 JSON Schema** (`schema/v1.1/factory.schema.json`) — New schema version accepting both `"1.0"` and `"1.1"` version strings
- **A2A section on website** (`docs/index.html`) — Discovery bridge, semantic mapping table, industrial task extension, and example Agent Card

### Changed

- `$schema` URLs updated from `argo.trade` to `factoryschema.org` across all examples and documentation
- `version` field in schema updated from `const: "1.0"` to `enum: ["1.0", "1.1"]`
- All three example profiles updated to v1.1 with `a2a` endpoint
- Website version badge updated from v1.0 to v1.1

## [1.0.0] - 2026-03-19

### Added

- Initial release of the factory.json specification
- JSON Schema (Draft 2020-12) with validation rules
- **Required fields**: `$schema`, `name`, `location`, `capabilities`
- **Root fields**: `version`, `legal_name`, `description`, `vertical`, `founded_year`, `employees`, `languages`, `website`, `industries_served`
- **Capabilities**: `processes`, `materials`, `finishes`, `secondary_services`, `equipment` — with shorthand (string array) and full (object) forms
- **Certifications**: `type`, `body`, `id`, `issued`, `expires`, `url`
- **Constraints**: `moq` (shorthand and object forms), `lead_time`, `capacity`, `max_dimensions`, `max_weight`, `tolerances` (shorthand and structured forms), `min_order_value`
- **Quality**: `testing`, `qc_process`, `inspection_equipment`, `documentation`, `defect_rate_ppm`, `traceability`
- **Engineering**: `file_formats`, `dfm_review`, `prototyping`, `reverse_engineering`, `cad_cam_software`, `codesign`
- **Shipping**: `incoterms`, `methods`, `markets_served`, `packaging`, `free_port`
- **Payment**: `terms`, `methods`, `currencies`
- **Compliance**: `ip_protection`, `export_controls`, `environmental`, `social`
- **Endpoints**: `rfq`, `api`, `mcp`, `website`, `email`, `phone`
- **Media**: `logo`, `cover`, `gallery`
- **Business hours**: `timezone`, `hours`, `response_time`
- **Custom**: Open-ended object for vertical-specific extensions
- Discovery mechanism via `/.well-known/factory.json` (RFC 8615)
- Three example profiles: CNC machine shop, PCB fabricator, textile factory
- Formal specification document (SPEC.md) with RFC 2119 language
