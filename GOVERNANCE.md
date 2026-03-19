# Governance

This document describes how the factory.json specification is managed and how decisions are made.

## Current Model: BDFL

The factory.json specification is currently maintained under a **Benevolent Dictator for Life (BDFL)** model, with [Argo Trade](https://argo.trade) as the primary steward.

The BDFL has final decision-making authority on:

- Accepting or rejecting field proposals
- Releasing new specification versions
- Setting the project roadmap
- Resolving disputes

## Transition Plan

When **three or more organizations** are actively contributing to the specification (through field proposals, implementations, or tooling), the governance model will transition to a **Steering Committee**:

- The committee will consist of one representative from each contributing organization
- Decisions will be made by simple majority vote
- The BDFL will serve as tie-breaker during the transition period
- Committee membership requires sustained contribution (at least 2 accepted proposals or implementations)

## Specification Change Process

All changes to the specification follow this process:

### 1. Proposal

A change is proposed via GitHub Issue using the appropriate template (see [CONTRIBUTING.md](CONTRIBUTING.md)).

### 2. Discussion

The proposal is open for community discussion for a minimum of **14 calendar days**. The discussion period MAY be extended for major changes.

### 3. Decision

After the discussion period:

- **Patch changes** (clarifications, typo fixes): Maintainer can merge directly
- **Minor changes** (new optional fields): Require BDFL approval (or committee vote under the steering committee model)
- **Major changes** (breaking): Require BDFL approval + extended 30-day discussion period

### 4. Implementation

The accepted change is implemented via pull request:

1. Schema update
2. Specification update
3. Example updates (if applicable)
4. CHANGELOG entry

### 5. Release

Changes are batched into releases following semver (see below).

## Versioning

The factory.json specification follows [Semantic Versioning 2.0.0](https://semver.org/):

| Change Type | Version Bump | Examples |
|-------------|-------------|----------|
| **Patch** | 1.0.x | Typo fixes, description clarifications, documentation improvements |
| **Minor** | 1.x.0 | New optional fields, new example files, non-breaking schema refinements |
| **Major** | x.0.0 | Required field changes, field removals, type changes, breaking validation changes |

### Release Cadence

- **Patch releases**: As needed
- **Minor releases**: Batched quarterly (or sooner if warranted)
- **Major releases**: No more than once per year, with at least 90 days notice

## Contact

For governance questions, reach out via:

- GitHub Issues on this repository
- Email: [hello@argo.trade](mailto:hello@argo.trade)
