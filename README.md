![Banner](https://github.com/user-attachments/assets/0d8a5cc7-7c8e-4969-9b01-11dd225a34dd)
![npm](https://img.shields.io/npm/v/country-is)
![downloads](https://img.shields.io/npm/dw/country-is)
![license](https://img.shields.io/npm/l/country-is)
![Security Policy](https://img.shields.io/badge/security-policy-brightgreen)
![npm_provenance](https://img.shields.io/badge/npm-provenance-brightgreen?logo=npm)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/country-is)

# country-is

🗺 A lightweight Typescript wrapper for the Country.is API with first-class support for Node.js and modern browsers. This package provides a clean, promise-based interface for retrieving country-location information without needing to manage raw fetch logic yourself. Original API Source: https://country.is/

### 📦 Installation

```console
npm install country-is
```

### 📘 Features

1. TypeScript-first with full type support
2. Simple promise-based API for Node.js and modern browsers
3. Supports package info, caller location lookup, IP-based lookup and multi-IP lookup
4. Supports optional field selection for enriched payloads
5. Minimal runtime footprint and tree-shake friendly packaging

### 🔤 Example Usage

1. 📁 **Get Package Info**:<br/>
Fetches service metadata and package details from the API with zero config overhead

```typescript
/* node modules */
import { getCountryIsInfo } from 'country-is';

async function myFunc() {
  try {
    const response = await getCountryIsInfo();
    console.log(response);
  } catch (error) {
    console.error('Failed to get package info:', error);
  }
}

await myFunc();
```

2. 📁 **Get Caller Location Info**<br/>
 Returns caller IP-based location info with opt field selection for tailored payload.

```typescript
/* node modules */
import { getCallerLocInfo } from 'country-is';

async function myFunc() {
  try {
    const response = await getCallerLocInfo({ fields: 'default' });
    console.log(response);
  } catch (error) {
    console.error('Failed to get caller location info:', error);
  }
}

await myFunc();
```

3. 📁 **Get Location Info by IP**<br/>
Fetches location data for a given IP and supports optional fields to limit the payload data.

```typescript
/* node modules */
import { getLocInfoByIP } from 'country-is';

async function myFunc() {
  try {
    const response = await getLocInfoByIP({
      ip: '1.1.1.1',
      fields: ['continent', 'asn'],
    });
    console.log(response);
  } catch (error) {
    console.error('Failed to get location info by IP:', error);
  }
}

await myFunc();
```

4. 📁 **Get Location Info for Multiple IPs**<br/>
Submits a batch of IP addresses to Country.is and returns location payloads with optional fields.

```typescript
/* node modules */
import { getMultiCallerLocInfo } from 'country-is';

async function myFunc() {
  try {
    const response = await getMultiCallerLocInfo({
      ips: ['1.1.1.1', '2.2.2.2'],
      fields: ['continent', 'asn'],
    });
    console.log(response);
  } catch (error) {
    console.error('Failed to get multi-caller location info:', error);
  }
}

await myFunc();
```

### 📗 Test Coverage

```
PASS src/get-multi-caller-loc-info/tests/get-multi-caller-loc-info.test.ts
  Get Multi Caller LOC Info
    ✓ returns 200-OK response when fields = 'default'
    ✓ returns 200-OK response when fields is an array
    ✓ throws an error when the ips array is empty
    ✓ sends the expected POST request body and headers
    ✓ returns an error response for a non-ok HTTP response

PASS src/info/tests/info.test.ts
  Get CountryIs Info
    ✓ returns the payload for a successful 200 response
    ✓ calls the info endpoint with a GET request
    ✓ returns a failed response payload for a non-ok response

PASS src/get-loc-info-by-ip/tests/get-loc-info-by-ip.test.ts
  Get Loc Info By IP
    ✓ returns 200-OK response when fields = 'default'
    ✓ returns 200-OK response when fields is an array
    ✓ throws an error when the ip address is empty
    ✓ sends the expected GET request for a specific IP
    ✓ returns an error response for a non-ok HTTP response

PASS src/get-caller-loc-info/tests/get-caller-loc-info.test.ts
  Get Caller Loc Info
    ✓ returns 200-OK response when fields = 'default'
    ✓ returns 200-OK response when fields is an array
    ✓ throws an error when fields is an invalid string
    ✓ sends the expected GET request for caller location info
    ✓ returns an error response for a non-ok HTTP response

---------------------------------|---------|----------|---------|---------|-------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------------|---------|----------|---------|---------|-------------------
All files                        |   93.02 |    83.92 |     100 |   93.02 |
 get-caller-loc-info             |   93.75 |    88.88 |     100 |   93.75 |
  index.ts                       |   93.75 |    88.88 |     100 |   93.75 | 40-42
 get-caller-loc-info/tests       |   94.59 |    83.33 |     100 |   94.59 |
  msw-handlers.ts                |   94.59 |    83.33 |     100 |   94.59 | 26-27
 get-loc-info-by-ip              |   85.29 |       80 |     100 |   85.29 |
  index.ts                       |   85.29 |       80 |     100 |   85.29 | 26-28,55-61
 get-loc-info-by-ip/tests        |   95.12 |    83.33 |     100 |   95.12 |
  msw-handlers.ts                |   95.12 |    83.33 |     100 |   95.12 | 27-28
 get-multi-caller-loc-info       |    93.1 |       80 |     100 |    93.1 |
  index.ts                       |    93.1 |       80 |     100 |    93.1 | 23,49-51
 get-multi-caller-loc-info/tests |   95.55 |     87.5 |     100 |   95.55 |
  msw-handlers.ts                |   95.55 |     87.5 |     100 |   95.55 | 31-32
 info                            |   91.17 |       75 |     100 |   91.17 |
  index.ts                       |   91.17 |       75 |     100 |   91.17 | 27-29
 info/tests                      |     100 |      100 |     100 |     100 |
  msw-handlers.ts                |     100 |      100 |     100 |     100 |
 shared                          |     100 |      100 |     100 |     100 |
  index.ts                       |     100 |      100 |     100 |     100 |
  msw-mock-server.ts             |     100 |      100 |     100 |     100 |
---------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 4 passed, 4 total
Tests:       18 passed, 18 total
Snapshots:   0 total
```

### 📘 Contributing

Contributions, suggestions, and improvements are welcome. Feel free to open issues or pull requests.

### 🔒 Security & Privacy

1. This package is open source and intended to provide reusable utilities for application development. It does not collect, store, transmit, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection mechanisms.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the [Security Policy](https://github.com/NPM-Workbench/country-is/blob/master/SECURITY.md).

### ❤️ Support

Like this project? Support it with a GitHub star, it would mean a lot to me! Cheers and Happy Coding.
