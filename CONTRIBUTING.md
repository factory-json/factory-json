# Contributing to factory.json

Thank you for your interest in contributing to the factory.json specification. This document explains how to propose changes, report issues, and submit pull requests.

## How to Propose a New Field

New fields go through a structured proposal process to ensure backward compatibility and broad usefulness.

### 1. Open a GitHub Issue

Use the **New Field Proposal** template and include:

- **Field name**: The proposed JSON key (use `snake_case`)
- **Parent object**: Where in the schema this field belongs (e.g., root, `capabilities`, `constraints`)
- **Type**: JSON type and structure
- **Motivation**: Why this field is needed — what use case does it serve? Include real-world examples.
- **Backward compatibility**: Does this change break existing valid documents? (New optional fields generally do not.)
- **Example**: A JSON snippet showing the field in context

### 2. Discussion Period

The proposal will be open for community discussion for at least 14 days. During this time:

- Maintainers and community members will review the proposal
- Alternative approaches may be suggested
- The proposal may be revised based on feedback

### 3. Decision

After the discussion period, a maintainer will either:

- **Accept**: The field will be added in the next minor release
- **Defer**: The proposal has merit but needs more real-world usage data
- **Decline**: The proposal does not fit the schema's goals (with explanation)

### 4. Implementation

Accepted proposals are implemented via pull request:

1. Update the JSON Schema (`schema/v1.0/factory.schema.json` or a new version directory)
2. Update SPEC.md with the field reference
3. Update at least one example file to demonstrate the field
4. Add a CHANGELOG.md entry

## How to Report a Bug

If you find an error in the schema (e.g., a validation issue, incorrect type, missing constraint), open a GitHub Issue with:

- **Description**: What is wrong
- **Expected behavior**: What the schema should do
- **Actual behavior**: What it currently does
- **Reproduction**: A JSON snippet that demonstrates the issue

## Pull Request Process

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Ensure all JSON files are valid (`npx ajv validate` or equivalent)
5. Update CHANGELOG.md
6. Open a pull request with a clear description

### PR Review

- All PRs require at least one maintainer approval
- Schema changes require the SPEC.md field reference to be updated
- New fields require at least one example file update

## Style Guide for Schema Descriptions

When writing `description` values in the JSON Schema:

- Use sentence case (capitalize only the first word)
- End with a period
- Be specific — include examples in parentheses where helpful (e.g., `"ISO 3166-1 alpha-2 country code."`)
- Use consistent terminology: "free-form" for open-ended strings, "shorthand" for simpler alternatives
- Keep descriptions under 200 characters

## Code of Conduct

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

If you're unsure whether your idea fits the project, open a discussion issue first. We're happy to help shape proposals before they become formal.
