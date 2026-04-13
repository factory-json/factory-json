---
schema: "https://factoryschema.org/v2.0/factory.schema.json"
name: "TaiPCB Technology Co., Ltd."
location:
  city: Taoyuan
  country: TW
  timezone: Asia/Taipei
  coordinates:
    lat: 24.9936
    lng: 121.3010
vertical: pcb
capabilities:
  - multilayer PCB fabrication
  - HDI (High Density Interconnect)
  - flex-rigid PCB
  - impedance control
  - blind/buried vias
  - heavy copper (up to 6 oz)
  - backplane / thick board
certifications:
  - type: "ISO 9001:2015"
    body: SGS
    issued: "2022-04-01"
    expires: "2025-03-31"
  - type: "IATF 16949:2016"
    body: "TUV Rheinland"
    issued: "2023-01-15"
    expires: "2025-12-31"
  - type: IPC-A-600 Class 3
    body: IPC
  - type: UL Listed
    body: UL
    id: E123456
    url: "https://iq.ulprospector.com/info"
  - type: "ISO 14001:2015"
    body: SGS
    issued: "2022-04-01"
    expires: "2025-03-31"
website: "https://taipcb.example.com"
email: rfq@taipcb.example.com
---

# TaiPCB Technology Co., Ltd.

Advanced multilayer and HDI PCB fabrication for automotive, telecom, and industrial applications. Founded 2003. 300–350 employees. Languages: Chinese, English, Japanese.

## Capabilities

### Processes

Multilayer PCB fabrication, HDI (High Density Interconnect), flex-rigid PCB, impedance control, blind/buried vias, heavy copper (up to 6 oz), backplane / thick board.

### Materials

FR-4 (Tg 170°C), FR-4 high-Tg (Tg 180°C), Rogers RO4350B, Rogers RO3003, polyimide, aluminum-backed, Isola 370HR.

### Finishes

ENIG, HASL (lead-free), OSP, immersion silver, immersion tin, hard gold, soft gold (wire bonding).

### Secondary Services

Electrical testing, controlled impedance verification, panelization, stencil fabrication, UL marking.

### Equipment

| Equipment | Type | Count | Key Specs |
|-----------|------|-------|-----------|
| Orbotech Nuvogo 800 | Laser direct imaging (LDI) | 3 | — |
| Schmoll XRC-2 | CNC drill | 8 | 0.075mm min drill, 200k RPM |
| Hakuto AOI System | Automated optical inspection | 4 | — |
| Burkle vacuum lamination press | Lamination press | 3 | — |

### PCB Specifications

- **Max layers:** 32
- **Min trace/space:** 2.5 mil (63 µm)
- **Min via diameter:** 0.1 mm
- **Max aspect ratio:** 12:1
- **Max copper weight:** 6 oz
- **Board thickness:** 0.4–6.0 mm
- **Max dimensions:** 580 x 480 mm

### Tolerances

- **Standard:** ±0.1 mm (outline), ±0.075 mm (drill registration)
- **Precision:** ±0.05 mm drill, ±0.025 mm LDI feature
- **By process:** drill position ±0.05mm, registration ±0.075mm, outline routing ±0.1mm, impedance ±10%, trace width ±0.02mm
- **Min feature:** 2.5 mil trace/space (63 µm)
- **Min board thickness:** 0.4 mm

### Constraints

- **MOQ:** 5–50,000 panels
- **Lead time:** 5–25 days (3 days for samples, expedite available)
- **Capacity:** 15,000 panels/month
- **Min order value:** $200 USD

## Quality

AOI after each imaging step, 100% electrical test, impedance coupon verification on every production lot. Defect rate: 500 PPM.

### Testing

Automated optical inspection (AOI), electrical testing (flying probe & fixture), impedance testing (CITS), cross-section analysis, ionic contamination testing, thermal stress testing, solder float test.

### Inspection Equipment

| Equipment | Type | Count |
|-----------|------|-------|
| Hakuto AOI | Automated optical inspection | 4 |
| Takaya APT-9411 | Flying probe tester | 2 |
| Polar CITS880s | Controlled impedance test system | 1 |

### Documentation

IPC test report, impedance test coupon data, cross-section photos (on request), certificate of conformance (CoC), UL traceability, RoHS declaration.

### Traceability

Full lot traceability per panel. UL-recognized traceability system linking raw material lots to finished boards.

## Engineering

**File formats:** Gerber (RS-274X), Gerber X2, ODB++, Excellon drill, DXF, IPC-2581
**DFM review:** Yes | **Prototyping:** Yes | **Reverse engineering:** No
**CAD/CAM software:** CAM350, Genesis 2000, InCAM

## Shipping & Logistics

**Incoterms:** EXW, FOB Taoyuan, CIF, DDP
**Methods:** Air freight, express courier (DHL, FedEx), sea freight
**Markets served:** US, JP, DE, CN, KR, GB, SE
**Packaging:** Vacuum sealed, ESD bags, moisture barrier bags, desiccant packs

**Payment terms:** 50% deposit / 50% before shipment; Net 30 (qualified accounts); credit card (orders under $5000)
**Payment methods:** T/T (wire transfer), credit card, PayPal
**Currencies:** USD, TWD, JPY, EUR

## Compliance

**IP protection:** NDA standard for all new customers. Gerber files stored on access-controlled servers with 90-day auto-purge option.
**Environmental:** RoHS compliant, REACH compliant, ISO 14001, halogen-free capable
**Social:** SA8000

## RFQ Requirements

**Endpoint:** https://taipcb.argo.trade/rfq
**MCP:** https://taipcb.argo.trade/.well-known/mcp
**A2A:** https://taipcb.example.com/.well-known/agent-card.json

## About

**Industries served:** Automotive, telecommunications, industrial controls, medical devices, aerospace
**Founded:** 2003
**Business hours:** Mon–Fri 08:30–17:30 (Asia/Taipei)
**RFQ response time:** Within 4 business hours
