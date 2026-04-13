# factory.md Specification v2.0

## Abstract

This document defines **factory.md**, a human- and machine-readable format for describing manufacturing facilities. A factory.md file is a Markdown document with YAML frontmatter. The frontmatter contains a small set of structured fields for discovery and indexing. The Markdown body contains rich, free-form descriptions of the facility's capabilities, quality processes, engineering support, compliance posture, and other details.

The format is designed to be hosted at a well-known URI, enabling automated discovery by AI agents, procurement platforms, and search engines. The Markdown body is directly consumable by large language models without parsing, while the YAML frontmatter supports programmatic filtering and search indexing.

## Status

This is version **2.0** of the factory.md specification, published by Factory Schema. This is a **breaking change** from v1.x (factory.json). See [CHANGELOG.md](CHANGELOG.md) for migration details.

## Table of Contents

- [1. Terminology](#1-terminology)
- [2. Discovery Mechanism](#2-discovery-mechanism)
- [3. Document Structure](#3-document-structure)
- [4. Frontmatter Fields](#4-frontmatter-fields)
- [5. Markdown Body](#5-markdown-body)
- [6. Media Type](#6-media-type)
- [7. Versioning Policy](#7-versioning-policy)
- [8. Security Considerations](#8-security-considerations)
- [9. Examples](#9-examples)
- [10. A2A Interoperability](#10-a2a-interoperability)
- [Appendix A. Common Values](#appendix-a-common-values-non-normative)

---

## 1. Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

Additional terms:

- **factory.md file**: A Markdown document with YAML frontmatter conforming to this specification.
- **Frontmatter**: The YAML block delimited by `---` at the beginning of a factory.md file. Validated against the factory.md JSON Schema.
- **Body**: The Markdown content following the frontmatter closing `---` delimiter.
- **Publisher**: An entity that creates and hosts a factory.md file.
- **Consumer**: A software agent, platform, or service that reads and processes a factory.md file.

## 2. Discovery Mechanism

### 2.1 Well-Known URI

A factory.md file SHOULD be hosted at the following well-known URI on the publisher's domain, per [RFC 8615](https://www.rfc-editor.org/rfc/rfc8615):

```
https://{domain}/.well-known/factory.md
```

### 2.2 Transport

The file MUST be served over HTTPS. Consumers SHOULD NOT fetch factory.md files over plain HTTP.

### 2.3 Content-Type

The server MUST serve the file with a `Content-Type` header of `text/markdown; charset=utf-8`.

### 2.4 Caching

Publishers SHOULD set appropriate `Cache-Control` headers. A `max-age` of 86400 (24 hours) is RECOMMENDED for production files.

### 2.5 Alternative Locations

A factory.md file MAY also be hosted at other paths (e.g., `/factory.md`, `/about/factory.md`). However, consumers SHOULD check `/.well-known/factory.md` first.

## 3. Document Structure

A factory.md file consists of two parts:

1. **YAML frontmatter** — a structured block delimited by `---` at the start of the file. The opening `---` MUST be the first line. The closing `---` MUST appear on its own line. The frontmatter is validated against the JSON Schema (Draft 2020-12) located at:

   ```
   https://factoryschema.org/v2.0/factory.schema.json
   ```

2. **Markdown body** — free-form content following the frontmatter. The body uses standard Markdown (CommonMark) and SHOULD use the recommended sections described in [Section 5](#5-markdown-body). The body is NOT validated by the schema.

### 3.1 Required Fields

A valid factory.md file MUST include the following frontmatter fields:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Trade name of the factory (MUST be non-empty) |
| `location` | `string` or `object` | Factory location |

### 3.2 Recommended Fields

The following frontmatter fields are RECOMMENDED:

| Field | Type | Description |
|-------|------|-------------|
| `schema` | `string` | Schema URI for validation |
| `vertical` | `string` | Primary industry vertical |
| `capabilities` | `string[]` | Manufacturing processes offered |
| `certifications` | `object[]` | Industry certifications |
| `website` | `string` | Factory website URL |
| `email` | `string` | Contact email address |

### 3.3 Design Rationale

The frontmatter is intentionally minimal. It contains only the fields needed for programmatic discovery, filtering, and indexing. All rich, descriptive content — equipment details, quality processes, tolerances, compliance narratives, shipping logistics — belongs in the Markdown body where it is readable by both humans and AI agents without structured parsing.

## 4. Frontmatter Fields

### 4.1 `schema`

- **Type**: `string` (const)
- **Value**: MUST be `"https://factoryschema.org/v2.0/factory.schema.json"` if present.
- **Description**: Identifies the document as a factory.md file and pins it to this schema version. RECOMMENDED.

### 4.2 `name` (REQUIRED)

- **Type**: `string` (minLength: 1)
- **Description**: Trade name of the factory. This is the name commonly used in business, not necessarily the registered legal name.

### 4.3 `location` (REQUIRED)

- **Type**: `string` OR `object`
- **Description**: Factory location.

**String form** (shorthand): A simple string such as `"Shenzhen, CN"`. MUST be non-empty.

**Object form** (structured):

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `city` | `string` | Yes | City name |
| `region` | `string` | No | State, province, or region |
| `country` | `string` | Yes | ISO 3166-1 alpha-2 country code (e.g. `"CN"`, `"US"`) |
| `postal_code` | `string` | No | Postal or ZIP code |
| `timezone` | `string` | No | IANA timezone identifier (e.g. `"Asia/Shanghai"`) |
| `coordinates` | `object` | No | `{ "lat": number, "lng": number }` — WGS 84 |

### 4.4 `vertical`

- **Type**: `string`
- **Description**: Primary industry vertical. Free-form, e.g. `"machining"`, `"pcb"`, `"textiles"`, `"injection-molding"`. See [Appendix A](#appendix-a-common-values-non-normative) for common values. RECOMMENDED.

### 4.5 `capabilities`

- **Type**: `array` of `string` (minItems: 1)
- **Description**: Manufacturing processes offered, as free-form strings. See [Appendix A](#appendix-a-common-values-non-normative) for common values. RECOMMENDED.

This field is a flat list of process names for indexing and search. Detailed capability descriptions (materials, equipment, tolerances, finishes) belong in the Markdown body's [Capabilities](#51-capabilities) section.

### 4.6 `certifications`

- **Type**: `array` of `object`
- **Description**: Industry certifications and compliance credentials. RECOMMENDED.

Each certification object:

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Certification name (e.g. `"ISO 9001:2015"`, `"GOTS"`, `"UL Listed"`) |
| `body` | `string` | No | Issuing or certifying body |
| `id` | `string` | No | Certificate ID or number |
| `issued` | `string` | No | Date issued (format: `YYYY-MM-DD`) |
| `expires` | `string` | No | Expiry date (format: `YYYY-MM-DD`) |
| `url` | `string` | No | Link to certificate or verification page (format: URI) |

### 4.7 `website`

- **Type**: `string` (format: URI)
- **Description**: Factory website URL. RECOMMENDED.

### 4.8 `email`

- **Type**: `string`
- **Description**: Contact email address. RECOMMENDED.

### 4.9 Additional Properties

The frontmatter schema sets `additionalProperties: false`. Fields not listed above MUST NOT appear in the frontmatter. All other information belongs in the Markdown body.

## 5. Markdown Body

The Markdown body SHOULD contain the following sections. These sections are RECOMMENDED but not validated by the schema. Publishers MAY include additional sections, omit sections, or reorder them. The section headings below are conventions — publishers MAY use alternative headings that convey the same meaning.

Publishers SHOULD NOT omit the Capabilities section, as it is the primary source of detailed manufacturing information for consumers.

### 5.1 Capabilities (RECOMMENDED)

Publishers SHOULD include a Capabilities section describing:

- **Processes** — detailed descriptions of manufacturing processes offered
- **Materials** — materials the factory can work with
- **Finishes** — surface finishes and post-processing available
- **Equipment** — major equipment with model names, counts, and key specifications (tables are RECOMMENDED)
- **Secondary services** — additional services beyond primary manufacturing (e.g. assembly, heat treatment, packaging)
- **Tolerances** — standard and precision tolerances, by process if applicable, surface finish capabilities
- **Constraints** — MOQ, lead times, capacity, max dimensions, max weight, min order value

Vertical-specific data (e.g. max layers for PCB, GSM range for textiles) SHOULD be included in this section rather than in a separate section.

### 5.2 Certifications (RECOMMENDED)

If certifications are listed in the frontmatter, publishers MAY include a Certifications section in the body with additional detail (e.g. scope, verification links, compliance notes). If certifications are NOT in the frontmatter, publishers SHOULD describe them in this body section.

### 5.3 Quality (RECOMMENDED)

Publishers SHOULD include a Quality section describing:

- QC process and workflow
- Testing methods and equipment
- Inspection equipment (tables are RECOMMENDED)
- Documentation provided with shipments
- Defect rates
- Material and process traceability

### 5.4 Engineering (RECOMMENDED)

Publishers SHOULD include an Engineering section describing:

- Accepted file formats
- DFM (Design for Manufacturing) review availability
- Prototyping and sample run capability
- Reverse engineering capability
- CAD/CAM software used in-house
- Co-design or product development services

### 5.5 Shipping & Logistics (OPTIONAL)

Publishers MAY include a Shipping & Logistics section describing:

- Supported Incoterms
- Shipping methods
- Markets served (countries/regions)
- Packaging capabilities
- Payment terms, methods, and accepted currencies

### 5.6 Compliance (RECOMMENDED for regulated industries)

Publishers SHOULD include a Compliance section if the factory operates in regulated industries. This section SHOULD cover:

- IP protection measures (NDA policies, access controls, audit logging)
- Export controls (ITAR, EAR, or other regimes)
- Environmental practices and certifications
- Social and labor compliance

### 5.7 RFQ Requirements (OPTIONAL)

Publishers MAY include an RFQ Requirements section describing:

- RFQ submission endpoint URI
- MCP and A2A endpoint URIs
- Required fields and files for RFQ submission
- Accepted part/product types
- NDA requirements
- Auto-quote availability
- Special instructions or caveats

### 5.8 About (OPTIONAL)

Publishers MAY include an About section with:

- Legal name
- Industries served
- Founded year
- Employee count
- Languages spoken
- Business hours and timezone
- RFQ response time

## 6. Media Type

A factory.md file MUST be served with the media type `text/markdown; charset=utf-8`, per [RFC 7763](https://www.rfc-editor.org/rfc/rfc7763).

Consumers SHOULD identify factory.md files by the presence of YAML frontmatter containing a `name` field and a `location` field, or by the `schema` field with the value `"https://factoryschema.org/v2.0/factory.schema.json"`.

## 7. Versioning Policy

The factory.md specification follows [Semantic Versioning 2.0.0](https://semver.org/):

- **Patch** (e.g. 2.0.1): Clarifications, typo fixes, and documentation improvements. No schema changes.
- **Minor** (e.g. 2.1.0): New optional frontmatter fields added, or new recommended body sections. Existing valid documents remain valid.
- **Major** (e.g. 3.0.0): Breaking changes. Previously valid documents MAY become invalid.

### 7.1 Migration from v1.x

Version 2.0 is a breaking change from v1.x (factory.json):

- The file format changed from JSON to Markdown with YAML frontmatter.
- The well-known URI changed from `/.well-known/factory.json` to `/.well-known/factory.md`.
- The Content-Type changed from `application/json` to `text/markdown; charset=utf-8`.
- The `$schema` field was replaced by `schema` (no dollar prefix).
- Most fields moved from the validated schema to the unvalidated Markdown body.
- The frontmatter retains only: `schema`, `name`, `location`, `vertical`, `capabilities`, `certifications`, `website`, `email`.

During a transition period, publishers MAY serve both `/.well-known/factory.json` (v1.x) and `/.well-known/factory.md` (v2.0). If both exist, consumers SHOULD prefer `factory.md`.

## 8. Security Considerations

### 8.1 Sensitive Data

Publishers SHOULD carefully consider what data to include. The factory.md file is intended to be public. Do NOT include:

- Internal pricing or cost structures
- Employee personal information
- Security credentials or API keys
- Confidential customer lists

### 8.2 HTTPS

The file MUST be served over HTTPS to prevent tampering in transit.

### 8.3 Data Accuracy

Consumers SHOULD NOT treat factory.md data as verified or audited. Certifications, capabilities, and other claims are self-reported by the publisher. Consumers requiring verified data SHOULD implement additional validation workflows.

### 8.4 Rate Limiting

Publishers MAY implement rate limiting on the `/.well-known/factory.md` endpoint to prevent excessive crawling.

### 8.5 CORS

Publishers SHOULD set appropriate CORS headers (`Access-Control-Allow-Origin`) if the file is intended to be fetched by browser-based applications.

### 8.6 YAML Parsing

Consumers MUST use a safe YAML parser that does not execute arbitrary code. Publishers SHOULD quote values that could be misinterpreted by YAML parsers — in particular, country codes like `NO` (Norway) and `AT` (Austria) which some parsers interpret as boolean values. Quoting all string values in the frontmatter is RECOMMENDED.

## 9. Examples

### 9.1 Minimal

```markdown
---
name: "My Factory"
location: "Shenzhen, CN"
---

# My Factory

CNC milling and turning shop serving the electronics industry.
```

### 9.2 Recommended

```yaml
---
schema: "https://factoryschema.org/v2.0/factory.schema.json"
name: "My Factory"
location: "Shenzhen, CN"
vertical: machining
capabilities:
  - CNC milling
  - CNC turning
certifications:
  - type: "ISO 9001:2015"
website: "https://myfactory.example.com"
email: sales@myfactory.example.com
---
```

### 9.3 Full Examples

See the [examples/](examples/) directory for complete, real-world profiles:

- [factory-machine-shop.md](examples/factory-machine-shop.md) — CNC machine shop (Shenzhen, China)
- [factory-pcb-fab.md](examples/factory-pcb-fab.md) — PCB fabrication facility (Taoyuan, Taiwan)
- [factory-textile.md](examples/factory-textile.md) — Textile/garment manufacturer (Tirupur, India)
- [agent-card.json](examples/agent-card.json) — A2A Agent Card corresponding to the machine shop example

---

## 10. A2A Interoperability

### 10.1 Overview

The [A2A (Agent-to-Agent) protocol](https://a2a-protocol.org) defines a standard for AI agents to discover each other's capabilities and exchange tasks. factory.md integrates with A2A as a **protocol extension**, allowing manufacturing facilities to be discovered through the A2A ecosystem while keeping factory.md as the authoritative source for rich manufacturing data.

The A2A Agent Card at `/.well-known/agent-card.json` serves as the **interaction entry point** — a lean file describing how to communicate with the factory's agent. The factory.md file at `/.well-known/factory.md` remains the **data layer** — the complete manufacturing profile.

A2A interoperability is OPTIONAL. Factories MAY adopt it incrementally: first publish a factory.md (static profile), then add an A2A Agent Card (active agent endpoint) when ready.

### 10.2 Extension Registration

factory.md is registered as an A2A extension. Agent Cards that link to a factory profile SHOULD declare the extension in `capabilities.extensions`:

```json
{
  "capabilities": {
    "extensions": [
      {
        "uri": "https://factoryschema.org/a2a-extension/v1",
        "description": "Manufacturing facility profile (factory.md)",
        "required": false
      }
    ]
  }
}
```

Setting `required: false` ensures generic A2A clients can interact with the agent without understanding factory.md. Manufacturing-aware clients MAY fetch and parse the linked profile for richer context.

### 10.3 Discovery

The Agent Card and factory.md reference each other through bidirectional links:

**Agent Card → factory.md**: The Agent Card SHOULD include a `metadata.factoryProfile` field containing the URI of the factory.md file:

```json
{
  "metadata": {
    "factoryProfile": "https://factory.example.com/.well-known/factory.md",
    "vertical": "machining",
    "location": "Shenzhen, CN"
  }
}
```

The `vertical` and `location` fields are RECOMMENDED as inline hints, allowing A2A clients to filter and route without fetching the full profile.

**factory.md → Agent Card**: The factory.md body (typically in the RFQ Requirements section) SHOULD include the A2A endpoint URI.

### 10.4 Lean Agent Card Design

The Agent Card SHOULD remain lean — limited to what an A2A client needs to decide whether and how to interact with the agent. Rich manufacturing data (certifications, tolerances, equipment, constraints, quality processes) stays in factory.md.

**What belongs in the Agent Card**:
- Agent name, description, and provider
- Supported interfaces (URL, protocol binding, version)
- Skills at a summary level (id, name, description, tags)
- Extension declaration and factory profile URI
- Lightweight routing hints (vertical, location)

**What stays in factory.md**:
- Detailed capabilities (processes, materials, finishes, equipment)
- Certifications with expiry dates and issuing bodies
- Production constraints (MOQ, lead times, tolerances, capacity)
- Quality processes and inspection equipment
- Engineering support (file formats, DFM, prototyping)
- RFQ intake requirements
- Shipping, payment, and compliance details

### 10.5 Semantic Mapping

When a consumer fetches factory.md via the `metadata.factoryProfile` URI, the following mapping relates factory.md content to A2A concepts:

| factory.md Content | A2A Concept | Mapping |
|---|---|---|
| Frontmatter: `name`, `location` | Agent Card identity | Map directly to the Agent Card's `name` and `metadata.location`. |
| Frontmatter: `capabilities` | `AgentSkill` | Each process MAY be represented as a skill, or summarized into a single skill. |
| Body: Engineering file formats | Input artifact MIME types | Accepted file formats inform which MIME types the agent can receive as task input artifacts. |
| Body: RFQ required fields | Skill input requirements | Required RFQ fields define what the RFQ intake skill expects as structured input. |
| Body: RFQ required files | Required input artifacts | Required file types map to MIME types the RFQ intake skill requires as input artifacts. |
| Body: NDA requirements | Pre-authentication step | If NDA is required, the A2A task flow SHOULD include an NDA signing step before accepting file artifacts. |
| Frontmatter: `certifications` | Trust signals | Consumers MAY use certifications to evaluate agent trustworthiness before initiating a task. |
| Body: Constraints | Feasibility filtering | Consumers SHOULD check constraints (MOQ, max dimensions, tolerances) before submitting a task. |

### 10.6 Industrial Task Extension

When using A2A tasks for RFQ workflows, the following conventions are RECOMMENDED:

**Input Artifacts**: STEP files (`model/step`), PDF drawings (`application/pdf`), DXF files (`image/vnd.dxf`).

**Status Mapping**:

| A2A Task State | Manufacturing Meaning |
|---|---|
| `submitted` | RFQ Received |
| `working` | Quoting in Progress |
| `input-required` | Clarification Needed (e.g. missing tolerances, ambiguous drawing) |
| `completed` | Quote Issued |
| `failed` | Unable to Quote (e.g. capability mismatch, export restriction) |

**Output Artifacts**: Quote PDF (`application/pdf`), structured quote JSON (`application/json`).

### 10.7 Trust & Verification

Agent Cards MAY be signed using JSON Web Signature (JWS) to establish authenticity. This is OPTIONAL and not required for basic interoperability.

Publishers who sign their Agent Cards SHOULD:

- Use a key associated with the factory's domain (e.g. via a `/.well-known/jwks.json` endpoint).
- Include the `factoryProfile` URL in the signed payload so consumers can verify the binding between the Agent Card and the factory profile.

Consumers SHOULD NOT treat Agent Card claims as verified without additional validation, consistent with the security guidance in [Section 8.3](#83-data-accuracy).

---

## Appendix A. Common Values (Non-Normative)

This appendix lists commonly used values for frontmatter fields. These values are **not** a controlled vocabulary — publishers MAY use any value. This list exists to promote convergence and reduce fragmentation.

### Common `vertical` Values

`machining`, `pcb`, `sheet-metal`, `injection-molding`, `die-casting`, `textiles`, `3d-printing`, `electronics-assembly`, `stamping`, `forging`, `extrusion`, `woodworking`, `ceramics`, `glass`, `composites`, `packaging`

### Common `capabilities` Values

**Machining**: `CNC milling`, `5-axis CNC milling`, `CNC turning`, `wire EDM`, `sinker EDM`, `surface grinding`, `cylindrical grinding`, `jig boring`, `Swiss turning`, `gun drilling`

**PCB**: `multilayer PCB fabrication`, `HDI`, `flex-rigid PCB`, `impedance control`, `blind/buried vias`, `heavy copper`, `RF/microwave PCB`

**Sheet Metal**: `laser cutting`, `CNC punching`, `press brake forming`, `welding (TIG/MIG)`, `spot welding`, `powder coating`, `sheet metal assembly`

**Injection Molding**: `injection molding`, `overmolding`, `insert molding`, `blow molding`, `rotational molding`, `thermoforming`

**Textiles**: `knitting`, `weaving`, `dyeing`, `cut-and-sew`, `embroidery`, `screen printing`, `sublimation printing`, `garment washing`

**Electronics**: `SMT assembly`, `through-hole assembly`, `wave soldering`, `reflow soldering`, `conformal coating`, `box build`, `cable assembly`

---

## References

- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)
- [RFC 2119 — Key words for use in RFCs](https://www.rfc-editor.org/rfc/rfc2119)
- [RFC 7763 — The text/markdown Media Type](https://www.rfc-editor.org/rfc/rfc7763)
- [RFC 8615 — Well-Known URIs](https://www.rfc-editor.org/rfc/rfc8615)
- [ISO 3166-1 alpha-2 — Country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [CommonMark Specification](https://spec.commonmark.org/)

---

This specification is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The JSON Schema is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
