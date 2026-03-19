# Changelog

All notable changes to the factory.json specification will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
