# factory.json

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Spec License: CC BY 4.0](https://img.shields.io/badge/Spec-CC%20BY%204.0-lightgrey.svg)](LICENSE)

**factory.json** is an open schema (v1.0) that makes manufacturing facilities machine-readable. A single JSON file describes a factory's capabilities, certifications, production constraints, and interaction endpoints — in a format any AI agent, procurement platform, or search engine can understand.

## Minimal Example

```json
{
  "$schema": "https://argo.trade/factory.schema.json",
  "name": "My Factory",
  "location": "Shenzhen, CN",
  "capabilities": ["CNC milling", "CNC turning"]
}
```

Only four fields are required: `$schema`, `name`, `location`, and `capabilities`. Everything else — materials, equipment, certifications, lead times, quality processes — can be added incrementally.

## Quick Start

1. **Create** a `factory.json` file using the [minimal example](#minimal-example) above
2. **Extend** it with optional fields from the [specification](SPEC.md#field-reference)
3. **Validate** against the [JSON Schema](schema/v1.0/factory.schema.json)
4. **Host** it at `/.well-known/factory.json` on your domain ([RFC 8615](https://www.rfc-editor.org/rfc/rfc8615))

```
https://yourfactory.com/.well-known/factory.json
```

This well-known URI makes your factory discoverable by AI agents and platforms without any prior knowledge of your site structure.

## Documentation

| Document | Description |
|----------|-------------|
| [SPEC.md](SPEC.md) | Formal specification with field reference (RFC 2119 language) |
| [schema/v1.0/factory.schema.json](schema/v1.0/factory.schema.json) | JSON Schema (Draft 2020-12) |
| [examples/](examples/) | Real-world example profiles across manufacturing verticals |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to propose changes |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [GOVERNANCE.md](GOVERNANCE.md) | Decision-making process |

## Examples

- [CNC Machine Shop](examples/factory-machine-shop.json) — Aerospace-grade precision machining in Shenzhen
- [PCB Fabricator](examples/factory-pcb-fab.json) — Multilayer and HDI board fabrication in Taoyuan
- [Textile Factory](examples/factory-textile.json) — Organic cotton knit garments in Tirupur

## License

- **Schema and code**: [Apache License 2.0](LICENSE)
- **Specification document** (SPEC.md): [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)

## Links

- Schema: `https://argo.trade/factory.schema.json`
- Website: [argo.trade](https://argo.trade)
