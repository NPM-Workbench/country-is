## Security Policy

**Open Source Notice**<br/>

`country-is` is an open source npm package. Its source code is publicly available for review, audit, contribution, and responsible improvement under the repository license. This package is intended to provide reusable client-side or application-side helper code for working with a public external API. It is not designed, published, or maintained for malicious, deceptive, surveillance, credential-harvesting, tracking, or unauthorized activity.

**Data Collection and Privacy**<br/>

This package does not intentionally collect, store, retain, analyze, sell, rent, trade, monetize, or process personal data for its own purposes. It does not include any hidden mechanism for gathering information about users, devices, applications, browsing activity, usage patterns, or application data.

The package is designed to perform only its documented functionality. Any data it handles is limited to the input explicitly provided by the consuming application when calling its exported functions. This package does not independently decide what data to collect, does not create user profiles, does not persist user information, and does not transmit data to any project-owned, maintainer-controlled, analytics, monitoring, advertising, or tracking service.

In particular, this project does not:

- Collect personal information from users;
- Collect credentials, passwords, authentication tokens, payment details, or private application data;
- Include analytics, fingerprinting, telemetry, advertising, or behavioral tracking code;
- Send data to a project-owned or maintainer-controlled server;
- Use hidden background services for data collection;
- Sell, disclose, or transfer user data to third parties for monetary benefit;
- Collect data for malicious, deceptive, surveillance, or unauthorized purposes.

**Network Behavior**<br/>

This package makes HTTP requests only as part of its documented API-client behavior. Those requests are intended to communicate with the public API or service that the package is built to support. This package does not secretly contact unrelated domains, exfiltrate application data, or perform hidden network activity outside its documented purpose.

Application developers are responsible for reviewing how they use the package, what data they pass into it, and whether their usage complies with their own privacy, security, legal, and operational requirements.

**Security Expectations for Consumers**<br/>

Consumers should treat this package like any other third-party dependency and review it before use in production environments. Recommended practices include:

- Install packages from trusted registries and verified sources;
- Pin or review dependency versions where appropriate;
- Avoid passing sensitive data unless the package explicitly requires it and the behavior is understood;
- Validate user-provided input before passing it into API or browser-detection functions;
- Review network behavior when using the package in sensitive applications;
- Keep the package updated when fixes or improvements are released.

**Reporting a Vulnerability**<br/>

If you discover a vulnerability, privacy issue, malicious behavior, dependency risk, or other security concern, please report it responsibly.

Preferred reporting methods:

- Open a GitHub Security Advisory for this repository, if available;
- If private advisories are not available, open a GitHub issue with a clear description;
- Avoid publishing exploit details that could put users at risk before maintainers have had a reasonable opportunity to review the issue.

Please include:

- Affected package name and version;
- Description of the issue;
- Steps to reproduce, if applicable;
- Potential impact;
- Suggested mitigation or patch, if known.

The maintainer(s) will make a reasonable effort to review valid reports, investigate impact, and publish a fix or guidance when appropriate.

**Supported Versions**<br/>

Security updates are generally expected to apply to the latest published version of the package. Users are encouraged to upgrade to the latest version when fixes or improvements are released.

**No Warranty**<br/>

This project is provided as open source software under the repository license and without warranty of any kind. Users and application developers are responsible for evaluating whether this package is suitable for their own security, privacy, compliance, and operational requirements.
