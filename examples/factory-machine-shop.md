---
schema: "https://factoryschema.org/v2.0/factory.schema.json"
name: "Precision Works Manufacturing Co."
location:
  city: Shenzhen
  region: Guangdong
  country: CN
  postal_code: "518000"
  timezone: Asia/Shanghai
  coordinates:
    lat: 22.5431
    lng: 114.0579
vertical: machining
capabilities:
  - 5-axis CNC milling
  - CNC turning
  - wire EDM
  - sinker EDM
  - surface grinding
  - cylindrical grinding
  - jig boring
certifications:
  - type: "ISO 9001:2015"
    body: "TUV SUD"
    id: "12-100-28456"
    issued: "2023-06-15"
    expires: "2026-06-14"
  - type: AS9100D
    body: BSI
    id: FM 12345
    issued: "2023-09-01"
    expires: "2026-08-31"
  - type: "ISO 13485:2016"
    body: "TUV SUD"
    id: "12-100-29001"
    issued: "2024-01-10"
    expires: "2027-01-09"
  - type: ITAR Registered
    body: U.S. DDTC
    id: M30456
website: "https://precisionworks.example.com"
email: sales@precisionworks.example.com
---

# Precision Works Manufacturing Co.

High-precision CNC machining facility specializing in aerospace and medical-grade components. Founded 2008. 120–150 employees. Languages: Chinese, English.

## Capabilities

### Processes

5-axis CNC milling, CNC turning, wire EDM, sinker EDM, surface grinding, cylindrical grinding, jig boring.

### Materials

Aluminum 6061-T6, aluminum 7075-T6, titanium Ti-6Al-4V, stainless steel 304, stainless steel 316L, stainless steel 17-4 PH, Inconel 718, PEEK, Delrin/POM, brass C360, copper C101, tool steel A2, tool steel D2.

### Finishes

Anodizing Type II (color), anodizing Type III (hard coat), passivation (citric & nitric), electropolishing, bead blasting, powder coating, nickel plating (electroless), chrome plating, black oxide, tumble deburring, vapor polishing (plastics).

### Secondary Services

Mechanical assembly, insert installation (helicoil, PEM), heat treatment coordination, laser engraving/marking, custom packaging, kitting.

### Equipment

| Equipment | Type | Count | Key Specs |
|-----------|------|-------|-----------|
| DMG Mori DMU 50 | 5-axis CNC mill | 4 | 500x450x400mm travel, 20k RPM, 60-tool changer |
| Mazak QTN-200 | CNC lathe | 6 | 300mm turning dia, live tooling, 5k RPM |
| Sodick ALC600G | Wire EDM | 2 | 600x400x350mm travel, 0.05mm min wire |
| Okamoto ACC-6-18DX | Surface grinder | 2 | 150x450mm table |

### Tolerances

- **Standard:** ±0.025 mm (ISO 2768-m)
- **Precision:** ±0.002 mm
- **By process:** 5-axis milling ±0.005mm, turning ±0.005mm, wire EDM ±0.003mm, grinding ±0.002mm, jig boring ±0.002mm
- **Surface finish:** Ra 1.6 µm standard, Ra 0.2 µm best
- **Positional:** ±0.01 mm true position
- **Flatness:** 0.005 mm over 100 mm
- **Roundness:** 0.003 mm
- **Min feature:** 0.3 mm internal radius
- **Min wall:** 0.5 mm (aluminum), 0.8 mm (steel)

### Constraints

- **MOQ:** 1–10,000 pieces
- **Lead time:** 10–35 days (5 days for samples, expedite available)
- **Capacity:** 25,000 pieces/month
- **Max dimensions:** 500 x 450 x 400 mm
- **Max weight:** 50 kg
- **Min order value:** $500 USD

## Quality

100% first article inspection, SPC on production runs, final CMM report included with every shipment. In-process inspection at critical operations. Defect rate: 800 PPM.

### Testing

CMM inspection, first article inspection (FAI / AS9102), surface roughness measurement, hardness testing (Rockwell, Vickers), material composition verification (XRF), thread gauging (go/no-go).

### Inspection Equipment

| Equipment | Type | Count | Key Specs |
|-----------|------|-------|-----------|
| Zeiss Contura | CMM | 2 | 1.8 µm accuracy, 700x1000x600mm range |
| Mitutoyo SJ-410 | Surface roughness tester | 3 | — |
| Keyence IM-8000 | Instant measurement system | 1 | — |
| Olympus Vanta XRF | Material analyzer | 1 | — |

### Documentation

FAI / AS9102, PPAP Level 3, certificate of conformance (CoC), mill certs / material certifications, dimensional inspection report, surface finish report, FAIR.

### Traceability

Full lot traceability from raw material to finished part. Each part laser-marked with serial number linked to inspection data.

## Engineering

**File formats:** STEP, IGES, DXF, DWG, Parasolid, SolidWorks (.sldprt), 3MF, PDF
**DFM review:** Yes | **Prototyping:** Yes | **Reverse engineering:** Yes
**CAD/CAM software:** Mastercam, SolidWorks, AutoCAD

## Shipping & Logistics

**Incoterms:** EXW, FOB Shenzhen, CIF, DDP
**Methods:** Air freight, sea freight (FCL/LCL), express courier (DHL, FedEx, UPS)
**Markets served:** US, DE, JP, GB, CA, AU, SG, KR
**Packaging:** Vacuum sealed, foam-cushioned, custom crating, VCI anti-corrosion wrap, individual part bags
**Free port:** Yantian Port, Shenzhen

**Payment terms:** 50% deposit / 50% before shipment; Net 30 (established accounts); 100% prepay (first order)
**Payment methods:** T/T (wire transfer), PayPal, L/C (letter of credit)
**Currencies:** USD, EUR, CNY

## Compliance

**IP protection:** NDA signed before quoting. Isolated production cells for sensitive projects. Access-controlled digital file servers with audit logging.
**Export controls:** ITAR, EAR
**Environmental:** RoHS compliant, REACH compliant, ISO 14001 (in progress)
**Social:** SA8000 certified

## RFQ Requirements

**Endpoint:** https://precisionworks.argo.trade/rfq
**MCP:** https://precisionworks.argo.trade/.well-known/mcp
**A2A:** https://precisionworks.example.com/.well-known/agent-card.json

- **Required fields:** quantity, material, delivery date
- **Required files:** STEP + PDF drawing with GD&T callouts
- **Accepted types:** machined parts, prototypes, production runs
- **NDA required** before quoting
- **No auto-quote** — all RFQs are reviewed by engineering
- ITAR parts require separate intake: sales@precisionworks.example.com

## About

**Legal name:** Precision Works Manufacturing (Shenzhen) Co., Ltd.
**Industries served:** Aerospace, medical devices, defense, semiconductor equipment, robotics
**Founded:** 2008
**Business hours:** Mon–Fri 08:00–18:00, Sat 08:00–12:00 (Asia/Shanghai)
**RFQ response time:** Within 24 hours
