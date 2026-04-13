# factory.md

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Spec License: CC BY 4.0](https://img.shields.io/badge/Spec-CC%20BY%204.0-lightgrey.svg)](LICENSE)

**factory.md** is an open standard (v2.0) that makes manufacturing facilities machine-readable. A single Markdown file with YAML frontmatter describes a factory's capabilities, certifications, and endpoints — readable by humans, AI agents, and procurement platforms alike. Structured frontmatter for discovery and filtering, rich Markdown body for everything else.

## Minimal Example

```markdown
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

# My Factory

Precision CNC machining for aerospace and medical components.

## Capabilities

5-axis CNC milling, CNC turning, wire EDM. Aluminum, steel, titanium.
```

Only two fields are required: `name` and `location`. Everything else — vertical, capabilities, certifications, website, email — is recommended. The Markdown body contains rich descriptions of quality processes, equipment, tolerances, compliance, and more.

## Quick Start

1. **Create** a `factory.md` file using the [minimal example](#minimal-example) above
2. **Describe** your factory with recommended frontmatter fields and Markdown body sections
3. **Validate** the frontmatter against the [JSON Schema](schema/v2.0/factory.schema.json)
4. **Host** it at `/.well-known/factory.md` on your domain ([RFC 8615](https://www.rfc-editor.org/rfc/rfc8615))

```
https://yourfactory.com/.well-known/factory.md
```

This well-known URI makes your factory discoverable by AI agents and platforms without any prior knowledge of your site structure.

## Documentation

| Document | Description |
|----------|-------------|
| [SPEC.md](SPEC.md) | Formal specification with field reference and recommended body sections (RFC 2119 language) |
| [schema/v2.0/factory.schema.json](schema/v2.0/factory.schema.json) | JSON Schema v2.0 (Draft 2020-12) — validates YAML frontmatter |
| [examples/](examples/) | Real-world example profiles across manufacturing verticals |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to propose changes |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [GOVERNANCE.md](GOVERNANCE.md) | Decision-making process |

## Examples

- [CNC Machine Shop](examples/factory-machine-shop.md) — Aerospace-grade precision machining in Shenzhen
- [PCB Fabricator](examples/factory-pcb-fab.md) — Multilayer and HDI board fabrication in Taoyuan
- [Textile Factory](examples/factory-textile.md) — Organic cotton knit garments in Tirupur
- [Agent Card](examples/agent-card.json) — A2A Agent Card for the machine shop example

v1.x JSON examples are preserved in [examples/v1/](examples/v1/) for reference.

## License

- **Schema and code**: [Apache License 2.0](LICENSE)
- **Specification document** (SPEC.md): [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

## Links

- Schema: `https://factoryschema.org/v2.0/factory.schema.json`
- Website: [factoryjson.org](https://factoryjson.org)
