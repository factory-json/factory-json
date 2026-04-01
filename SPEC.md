# factory.json Specification v1.2

## Abstract

This document defines **factory.json**, a machine-readable format for describing manufacturing facilities. A factory.json file contains structured data about a facility's capabilities, certifications, production constraints, quality processes, and interaction endpoints. The format is designed to be hosted at a well-known URI, enabling automated discovery by AI agents, procurement platforms, and search engines.

## Status

This is version **1.2** of the factory.json specification, published by Factory Schema.

## Table of Contents

- [1. Terminology](#1-terminology)
- [2. Discovery Mechanism](#2-discovery-mechanism)
- [3. Schema Overview](#3-schema-overview)
- [4. Field Reference](#4-field-reference)
- [5. Media Type](#5-media-type)
- [6. Versioning Policy](#6-versioning-policy)
- [7. Security Considerations](#7-security-considerations)
- [8. Examples](#8-examples)
- [9. A2A Interoperability](#9-a2a-interoperability)

---

## 1. Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

Additional terms:

- **factory.json file**: A JSON document conforming to this specification.
- **Publisher**: An entity that creates and hosts a factory.json file.
- **Consumer**: A software agent, platform, or service that reads and processes a factory.json file.

## 2. Discovery Mechanism

### 2.1 Well-Known URI

A factory.json file SHOULD be hosted at the following well-known URI on the publisher's domain, per [RFC 8615](https://www.rfc-editor.org/rfc/rfc8615):

```
https://{domain}/.well-known/factory.json
```

### 2.2 Transport

The file MUST be served over HTTPS. Consumers SHOULD NOT fetch factory.json files over plain HTTP.

### 2.3 Content-Type

The server MUST serve the file with a `Content-Type` header of `application/json`.

### 2.4 Caching

Publishers SHOULD set appropriate `Cache-Control` headers. A `max-age` of 86400 (24 hours) is RECOMMENDED for production files.

### 2.5 Alternative Locations

A factory.json file MAY also be hosted at other paths (e.g., `/factory.json`, `/api/factory.json`). However, consumers SHOULD check `/.well-known/factory.json` first.

## 3. Schema Overview

A factory.json file is a JSON object validated against the JSON Schema (Draft 2020-12) located at:

```
https://factoryschema.org/factory.schema.json
```

### 3.1 Required Fields

A valid factory.json file MUST include the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `$schema` | `string` | MUST be `"https://factoryschema.org/factory.schema.json"` |
| `name` | `string` | Trade name of the factory (MUST be non-empty) |
| `location` | `string` or `object` | Factory location |
| `capabilities` | `string[]` or `object` | What the factory can produce |

### 3.2 Optional Fields

All other fields are OPTIONAL. The schema is designed for incremental adoption — publishers can start with the four required fields and add detail over time.

### 3.3 Extensibility

The `custom` field provides an escape hatch for vertical-specific data that does not fit the standard schema. The root object does NOT allow additional properties beyond those defined in the schema.

## 4. Field Reference

### 4.1 Root Fields

#### `$schema` (REQUIRED)

- **Type**: `string` (const)
- **Value**: MUST be `"https://factoryschema.org/factory.schema.json"`
- **Description**: Identifies the document as a factory.json file and pins it to this schema version.

#### `version`

- **Type**: `string` (enum: `"1.0"`, `"1.1"`, `"1.2"`)
- **Description**: Schema version. SHOULD be included for forward compatibility.

#### `name` (REQUIRED)

- **Type**: `string` (minLength: 1)
- **Description**: Trade name of the factory. This is the name commonly used in business, not necessarily the registered legal name.

#### `legal_name`

- **Type**: `string`
- **Description**: Registered legal entity name, as it appears on incorporation documents.

#### `description`

- **Type**: `string`
- **Description**: Short free-text description of the factory and its specialization.

#### `vertical`

- **Type**: `string`
- **Description**: Primary industry vertical. Free-form, e.g. `"machining"`, `"pcb"`, `"textiles"`, `"injection molding"`.

#### `location` (REQUIRED)

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

#### `founded_year`

- **Type**: `integer` (minimum: 1800)
- **Description**: Year the factory was established.

#### `employees`

- **Type**: `object` — `{ "min": integer, "max": integer }`
- **Description**: Employee count range. Both `min` and `max` MUST be >= 1 if provided.

#### `languages`

- **Type**: `array` of `string`
- **Description**: Languages spoken at the factory. Each value MUST be an ISO 639-1 two-letter code (e.g. `"en"`, `"zh"`).

#### `website`

- **Type**: `string` (format: URI)
- **Description**: Factory website URL.

#### `industries_served`

- **Type**: `array` of `string`
- **Description**: Industries and market segments the factory serves (e.g. `"aerospace"`, `"medical"`, `"automotive"`).

### 4.2 Capabilities

#### `capabilities` (REQUIRED)

- **Type**: `string[]` (shorthand) OR `object` (full form)
- **Description**: What the factory can produce.

**Shorthand**: An array of process name strings. MUST have at least one item.

```json
"capabilities": ["CNC milling", "CNC turning", "wire EDM"]
```

**Object form**: A structured object with the following sub-fields:

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `processes` | `string[]` | Yes | Manufacturing processes offered (free-form). MUST have at least one item. |
| `materials` | `string[]` | No | Materials the factory can work with. |
| `finishes` | `string[]` | No | Surface finishes and post-processing available. |
| `secondary_services` | `string[]` | No | Additional services beyond primary manufacturing (e.g. `"assembly"`, `"heat treatment"`, `"packaging"`). |
| `equipment` | `object[]` | No | Major equipment on the factory floor. |

**Equipment object**:

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Equipment name/model |
| `type` | `string` | No | Equipment category |
| `count` | `integer` | No | Number of units (minimum: 1) |
| `specs` | `object` | No | Free-form key-value specifications |
| `year_acquired` | `integer` | No | Year the equipment was acquired |

### 4.3 Certifications

#### `certifications`

- **Type**: `array` of `object`
- **Description**: Industry certifications and compliance credentials.

Each certification object:

| Sub-field | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `string` | Yes | Certification name (e.g. `"ISO 9001"`, `"GOTS"`, `"UL Listed"`) |
| `body` | `string` | No | Issuing or certifying body |
| `id` | `string` | No | Certificate ID or number |
| `issued` | `string` | No | Date issued (format: `YYYY-MM-DD`) |
| `expires` | `string` | No | Expiry date (format: `YYYY-MM-DD`) |
| `url` | `string` | No | Link to certificate or verification page (format: URI) |

### 4.4 Constraints

#### `constraints`

- **Type**: `object`
- **Description**: Production constraints and limits. Additional properties are permitted for vertical-specific needs.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `moq` | `number` or `object` | Minimum order quantity. Shorthand: a plain number (units). Full: `{ "min": number, "max": number, "unit": string }` (`min` and `unit` required). |
| `lead_time` | `object` | `{ "min_days": integer (required), "max_days": integer, "sample_days": integer, "expedite_available": boolean }` |
| `capacity` | `object` | `{ "value": number (required), "unit": string (required), "period": string }` |
| `max_dimensions` | `object` | `{ "length": number, "width": number, "height": number, "unit": string }` |
| `max_weight` | `object` | `{ "value": number, "unit": string }` — Maximum part weight the facility can handle. |
| `tolerances` | `string` or `object` | Tolerance capabilities. Shorthand: a string (e.g. `"+-0.005 mm"`). Full form: structured object with `standard`, `precision`, `by_process`, `surface_finish`, `positional`, `flatness`, `roundness`, `min_feature_size`, `min_wall_thickness`. |
| `min_order_value` | `object` | `{ "amount": number, "currency": string }` |

### 4.5 Quality

#### `quality`

- **Type**: `object`
- **Description**: Quality assurance capabilities.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `testing` | `string[]` | Testing methods and equipment available (e.g. `"CMM inspection"`, `"AOI"`). |
| `qc_process` | `string` | Free-text description of the quality control workflow. |
| `inspection_equipment` | `object[]` | Dedicated inspection and measurement equipment. Same structure as capabilities equipment: `{ name, type, count, specs }`. |
| `documentation` | `string[]` | Documentation provided with shipments (e.g. `"FAI / AS9102"`, `"PPAP Level 3"`, `"CoC"`, `"mill certs"`). |
| `defect_rate_ppm` | `number` | Typical defect rate in parts per million (PPM). |
| `traceability` | `string` | Material and process traceability capability description. |

### 4.6 Engineering

#### `engineering`

- **Type**: `object`
- **Description**: Engineering and design support capabilities.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `file_formats` | `string[]` | Accepted file formats (e.g. `"STEP"`, `"Gerber"`, `"DXF"`). |
| `dfm_review` | `boolean` | Whether the factory provides Design for Manufacturing feedback. |
| `prototyping` | `boolean` | Whether prototyping / sample runs are offered. |
| `reverse_engineering` | `boolean` | Whether the factory can reverse-engineer from a physical sample. |
| `cad_cam_software` | `string[]` | CAD/CAM software used in-house. |
| `codesign` | `boolean` | Whether the factory offers co-design or product development services. |

### 4.7 Shipping

#### `shipping`

- **Type**: `object`
- **Description**: Shipping, logistics, and export capabilities.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `incoterms` | `string[]` | Supported Incoterms (e.g. `"EXW"`, `"FOB"`, `"CIF"`, `"DDP"`). |
| `methods` | `string[]` | Shipping methods available. |
| `markets_served` | `string[]` | Countries or regions regularly shipped to (ISO alpha-2 codes or region names). |
| `packaging` | `string[]` | Packaging capabilities (e.g. `"vacuum sealed"`, `"ESD bags"`). |
| `free_port` | `string` | Nearest free trade zone or port. |

### 4.8 Payment

#### `payment`

- **Type**: `object`
- **Description**: Payment terms and options.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `terms` | `string[]` | Standard payment terms (e.g. `"Net 30"`, `"50% deposit, 50% before shipment"`). |
| `methods` | `string[]` | Accepted payment methods (e.g. `"T/T"`, `"L/C"`, `"PayPal"`). |
| `currencies` | `string[]` | Accepted currencies (ISO 4217 codes, e.g. `"USD"`, `"EUR"`). |

### 4.9 Compliance

#### `compliance`

- **Type**: `object`
- **Description**: Regulatory, IP, environmental, and social compliance.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `ip_protection` | `string` | Intellectual property protection measures. |
| `export_controls` | `string[]` | Export control regimes the factory is compliant with (e.g. `"ITAR"`, `"EAR"`). |
| `environmental` | `string[]` | Environmental and sustainability practices (e.g. `"RoHS compliant"`, `"ISO 14001"`). |
| `social` | `string[]` | Social and labor compliance (e.g. `"SA8000"`, `"BSCI"`, `"SMETA"`). |

### 4.10 RFQ Requirements

#### `rfq`

- **Type**: `string` (URI, shorthand) OR `object` (full form)
- **Description**: RFQ intake requirements — what the factory needs in a Request for Quote submission.

**Shorthand**: A URI string, equivalent to `endpoints.rfq`.

```json
"rfq": "https://factory.example.com/rfq"
```

**Object form**: A structured object describing what the factory requires:

| Sub-field | Type | Description |
|-----------|------|-------------|
| `endpoint` | `string` (URI) | RFQ submission endpoint. If omitted, consumers SHOULD fall back to `endpoints.rfq`. |
| `required_fields` | `string[]` | Information fields required in every RFQ (e.g. `"quantity"`, `"material"`, `"target_price"`, `"delivery_date"`). Free-form strings — requirements vary by vertical. |
| `required_files` | `string[]` | File types that MUST accompany the RFQ (e.g. `"STEP"`, `"PDF drawing"`). Values SHOULD align with `engineering.file_formats`. |
| `accepted_types` | `string[]` | Part or product types the factory accepts RFQs for (e.g. `"machined parts"`, `"prototypes"`). If omitted, no restriction is implied. |
| `min_quantity` | `integer` | Minimum quantity to include in an RFQ. Distinct from `constraints.moq` — this is the threshold below which the factory will not review the RFQ at all. |
| `min_order_value` | `object` | `{ "amount": number, "currency": string }` — Minimum estimated order value for the factory to review an RFQ. Distinct from `constraints.min_order_value`, which is a production constraint. |
| `nda_required` | `boolean` | Whether a signed NDA is required before reviewing technical files. |
| `auto_quote` | `boolean` | Whether the factory supports instant or automated quoting for qualifying RFQs. |
| `notes` | `string` | Free-text instructions or caveats for RFQ submission. |

**Relationship to other fields:**

- `endpoints.rfq` remains valid. `rfq.endpoint` takes precedence if both exist. The `rfq` object is the expanded form of the endpoint.
- `rfq.required_files` is a subset of `engineering.file_formats`. A factory may *accept* STEP, IGES, DXF, and PDF, but *require* STEP + PDF drawing in every RFQ.
- `rfq.min_quantity` and `rfq.min_order_value` are intake filters. `constraints.moq` and `constraints.min_order_value` are production constraints. They may differ.
- `rfq.nda_required` is an actionable flag for AI agents. `compliance.ip_protection` provides descriptive context.

### 4.11 Endpoints

#### `endpoints`

- **Type**: `object`
- **Description**: Machine-readable interaction endpoints for AI agents and platforms.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `rfq` | `string` (URI) | RFQ submission endpoint. |
| `api` | `string` (URI) | REST API base URL. |
| `mcp` | `string` (URI) | MCP (Model Context Protocol) server URI. |
| `a2a` | `string` (URI) | A2A (Agent-to-Agent) protocol endpoint URI, typically pointing to `/.well-known/agent-card.json`. |
| `website` | `string` (URI) | Factory website. |
| `email` | `string` | Contact email address. |
| `phone` | `string` | Contact phone number. |

### 4.12 Media

#### `media`

- **Type**: `object`
- **Description**: Visual media assets.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `logo` | `string` (URI) | Logo image URL. |
| `cover` | `string` (URI) | Cover / hero image URL. |
| `gallery` | `string[]` (URI) | Array of gallery image URLs. |

### 4.13 Business Hours

#### `business_hours`

- **Type**: `object`
- **Description**: Business hours and responsiveness.

| Sub-field | Type | Description |
|-----------|------|-------------|
| `timezone` | `string` | IANA timezone (e.g. `"Asia/Shanghai"`). Can also be set in `location`. |
| `hours` | `string` | Operating hours (e.g. `"Mon-Fri 08:00-18:00"`). |
| `response_time` | `string` | Typical RFQ response time (e.g. `"within 24 hours"`). |

### 4.14 Custom

#### `custom`

- **Type**: `object` (additionalProperties: true)
- **Description**: Vertical-specific escape hatch. Any key-value pairs are allowed. Use this for domain-specific data that does not fit the standard fields (e.g. `max_layers` for PCB, `gsm_range` for textiles).

## 5. Media Type

A factory.json file MUST be served with the media type `application/json`.

There is no registered media type specific to factory.json. Consumers SHOULD identify factory.json files by the presence of the `$schema` field with the value `"https://factoryschema.org/factory.schema.json"`.

## 6. Versioning Policy

The factory.json specification follows [Semantic Versioning 2.0.0](https://semver.org/):

- **Patch** (e.g. 1.0.1): Clarifications, typo fixes, and documentation improvements. No schema changes.
- **Minor** (e.g. 1.1.0): New optional fields added. Existing valid documents remain valid.
- **Major** (e.g. 2.0.0): Breaking changes. Previously valid documents MAY become invalid.

The `version` field in the schema tracks the specification version. Publishers SHOULD include it.

## 7. Security Considerations

### 7.1 Sensitive Data

Publishers SHOULD carefully consider what data to include. The factory.json file is intended to be public. Do NOT include:

- Internal pricing or cost structures
- Employee personal information
- Security credentials or API keys
- Confidential customer lists

### 7.2 HTTPS

The file MUST be served over HTTPS to prevent tampering in transit.

### 7.3 Data Accuracy

Consumers SHOULD NOT treat factory.json data as verified or audited. Certifications, capabilities, and other claims are self-reported by the publisher. Consumers requiring verified data SHOULD implement additional validation workflows.

### 7.4 Rate Limiting

Publishers MAY implement rate limiting on the `/.well-known/factory.json` endpoint to prevent excessive crawling.

### 7.5 CORS

Publishers SHOULD set appropriate CORS headers (`Access-Control-Allow-Origin`) if the file is intended to be fetched by browser-based applications.

## 8. Examples

### 8.1 Minimal

```json
{
  "$schema": "https://factoryschema.org/factory.schema.json",
  "name": "My Factory",
  "location": "Shenzhen, CN",
  "capabilities": ["CNC milling", "CNC turning"]
}
```

### 8.2 Full Examples

See the [examples/](examples/) directory for complete, real-world profiles:

- [factory-machine-shop.json](examples/factory-machine-shop.json) — CNC machine shop (Shenzhen, China)
- [factory-pcb-fab.json](examples/factory-pcb-fab.json) — PCB fabrication facility (Taoyuan, Taiwan)
- [factory-textile.json](examples/factory-textile.json) — Textile/garment manufacturer (Tirupur, India)
- [agent-card.json](examples/agent-card.json) — A2A Agent Card corresponding to the machine shop example

---

## 9. A2A Interoperability

### 9.1 Overview

The [A2A (Agent-to-Agent) protocol](https://a2a-protocol.org) defines a standard for AI agents to discover each other's capabilities and exchange tasks. factory.json integrates with A2A as a **protocol extension**, allowing manufacturing facilities to be discovered through the A2A ecosystem while keeping factory.json as the authoritative source for rich manufacturing data.

The A2A Agent Card at `/.well-known/agent-card.json` serves as the **interaction entry point** — a lean file describing how to communicate with the factory's agent. The factory.json file at `/.well-known/factory.json` remains the **data layer** — the complete manufacturing profile with capabilities, certifications, constraints, and quality processes.

A2A interoperability is OPTIONAL. Factories MAY adopt it incrementally: first publish a factory.json (static profile), then add an A2A Agent Card (active agent endpoint) when ready.

### 9.2 Extension Registration

factory.json is registered as an A2A extension. Agent Cards that link to a factory profile SHOULD declare the extension in `capabilities.extensions`:

```json
{
  "capabilities": {
    "streaming": false,
    "pushNotifications": false,
    "extensions": [
      {
        "uri": "https://factoryschema.org/a2a-extension/v1",
        "description": "Manufacturing facility profile (factory.json)",
        "required": false
      }
    ]
  }
}
```

Setting `required: false` ensures generic A2A clients can interact with the agent without understanding factory.json. Manufacturing-aware clients MAY parse the linked profile for richer context.

### 9.3 Discovery

The Agent Card and factory.json reference each other through bidirectional links:

**Agent Card → factory.json**: The Agent Card SHOULD include a `metadata.factoryProfile` field containing the URI of the factory.json file:

```json
{
  "metadata": {
    "factoryProfile": "https://factory.example.com/.well-known/factory.json",
    "vertical": "machining",
    "location": "Shenzhen, CN"
  }
}
```

The `vertical` and `location` fields are RECOMMENDED as inline hints, allowing A2A clients to filter and route without fetching the full profile.

**factory.json → Agent Card**: The `endpoints.a2a` field in factory.json SHOULD point to the Agent Card URI:

```json
{
  "endpoints": {
    "rfq": "https://factory.example.com/rfq",
    "a2a": "https://factory.example.com/.well-known/agent-card.json"
  }
}
```

### 9.4 Lean Agent Card Design

The Agent Card SHOULD remain lean — limited to what an A2A client needs to decide whether and how to interact with the agent. Rich manufacturing data (certifications, tolerances, equipment, constraints, quality processes) stays in factory.json.

**What belongs in the Agent Card**:
- Agent name, description, and provider
- Supported interfaces (URL, protocol binding, version)
- Skills at a summary level (id, name, description, tags)
- Extension declaration and factory profile URI
- Lightweight routing hints (vertical, location)

**What stays in factory.json**:
- Detailed capabilities (processes, materials, finishes, equipment)
- Certifications with expiry dates and issuing bodies
- Production constraints (MOQ, lead times, tolerances, capacity)
- Quality processes and inspection equipment
- Engineering support (file formats, DFM, prototyping)
- RFQ intake requirements
- Shipping, payment, and compliance details

### 9.5 Semantic Mapping

When a consumer fetches factory.json via the `metadata.factoryProfile` URI, the following mapping relates factory.json fields to A2A concepts:

| factory.json Field | A2A Concept | Mapping |
|---|---|---|
| `name`, `description`, `location` | Agent Card identity | Map directly to the Agent Card's `name`, `description`, and `metadata.location`. |
| `capabilities.processes` | `AgentSkill` | Each process MAY be represented as a skill on the Agent Card, or summarized into a single skill. |
| `engineering.file_formats` | Input artifact MIME types | Accepted file formats inform which MIME types the agent can receive as task input artifacts. |
| `rfq.required_fields` | Skill input requirements | Required RFQ fields define what the RFQ intake skill expects as structured input. |
| `rfq.required_files` | Required input artifacts | Required file types map to MIME types the RFQ intake skill requires as input artifacts. |
| `rfq.nda_required` | Pre-authentication step | If true, the A2A task flow SHOULD include an NDA signing step before accepting file artifacts. |
| `rfq.auto_quote` | Skill response mode | Indicates whether the skill returns instant quotes or enters a human-reviewed pipeline. |
| `certifications` | Trust signals | Consumers MAY use certifications to evaluate agent trustworthiness before initiating a task. |
| `constraints` | Feasibility filtering | Consumers SHOULD check constraints (MOQ, max dimensions, tolerances) before submitting a task. |

### 9.6 Industrial Task Extension

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

### 9.7 Trust & Verification

Agent Cards MAY be signed using JSON Web Signature (JWS) to establish authenticity. This is OPTIONAL and not required for basic interoperability.

Publishers who sign their Agent Cards SHOULD:

- Use a key associated with the factory's domain (e.g. via a `/.well-known/jwks.json` endpoint).
- Include the `factoryProfile` URL in the signed payload so consumers can verify the binding between the Agent Card and the factory profile.

Consumers SHOULD NOT treat Agent Card claims as verified without additional validation, consistent with the security guidance in [Section 7.3](#73-data-accuracy).

---

## References

- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)
- [RFC 2119 — Key words for use in RFCs](https://www.rfc-editor.org/rfc/rfc2119)
- [RFC 8615 — Well-Known URIs](https://www.rfc-editor.org/rfc/rfc8615)
- [ISO 3166-1 alpha-2 — Country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
- [ISO 639-1 — Language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [Semantic Versioning 2.0.0](https://semver.org/)

---

This specification is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The JSON Schema is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
