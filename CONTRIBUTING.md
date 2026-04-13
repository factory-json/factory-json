# Contributing to factory.md

Thank you for your interest in contributing to the factory.md specification. This document explains how to propose changes, report issues, and submit pull requests.

## How to Propose a Change

Changes go through a structured proposal process to ensure backward compatibility and broad usefulness.

### 1. Open a GitHub Issue

Use the **Proposal** template and include:

- **What to change**: New frontmatter field, new recommended body section, or modification to existing spec
- **Location**: Where in the spec this change applies (frontmatter schema, body section guidance, or both)
- **Type**: For frontmatter fields: YAML type and structure. For body sections: recommended content.
- **Motivation**: Why this change is needed — what use case does it serve? Include real-world examples.
- **Backward compatibility**: Does this change break existing valid documents? (New optional frontmatter fields and new recommended body sections generally do not.)
- **Example**: A factory.md snippet showing the change in context

### 2. Discussion Period

The proposal will be open for community discussion for at least 14 days. During this time:

- Maintainers and community members will review the proposal
- Alternative approaches may be suggested
- The proposal may be revised based on feedback

### 3. Decision

After the discussion period, a maintainer will either:

- **Accept**: The change will be added in the next release
- **Defer**: The proposal has merit but needs more real-world usage data
- **Decline**: The proposal does not fit the spec's goals (with explanation)

### 4. Implementation

Accepted proposals are implemented via pull request:

1. Update the JSON Schema (`schema/v2.0/factory.schema.json`) if the change affects frontmatter fields
2. Update SPEC.md with the field reference or body section guidance
3. Update at least one example `.md` file to demonstrate the change
4. Add a CHANGELOG.md entry

## How to Report a Bug

If you find an error in the schema (e.g., a validation issue, incorrect type, missing constraint) or spec, open a GitHub Issue with:

- **Description**: What is wrong
- **Expected behavior**: What the schema or spec should say
- **Actual behavior**: What it currently says
- **Reproduction**: A factory.md snippet that demonstrates the issue

## Pull Request Process

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Ensure all example frontmatter validates against the schema
5. Update CHANGELOG.md
6. Open a pull request with a clear description

### PR Review

- All PRs require at least one maintainer approval
- Frontmatter schema changes require the SPEC.md field reference to be updated
- New frontmatter fields require at least one example file update
- Body section changes require SPEC.md Section 5 to be updated

## Style Guide

### YAML Frontmatter

- Use `snake_case` for field names
- Quote string values that could be misinterpreted by YAML parsers (country codes, cert types)
- Keep frontmatter minimal — if a field doesn't need programmatic filtering, it belongs in the body

### Schema Descriptions

When writing `description` values in the JSON Schema:

- Use sentence case (capitalize only the first word)
- End with a period
- Be specific — include examples in parentheses where helpful (e.g., `"ISO 3166-1 alpha-2 country code."`)
- Keep descriptions under 200 characters

### Markdown Body

- Use `## Heading` (H2) for top-level sections
- Use `### Heading` (H3) for sub-sections
- Use tables for equipment and inspection equipment lists
- Use bold key-value pairs (`**Key:** Value`) for compact field listings

## Code of Conduct

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

If you're unsure whether your idea fits the project, open a discussion issue first. We're happy to help shape proposals before they become formal.
