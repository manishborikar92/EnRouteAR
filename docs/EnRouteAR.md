# EnRouteAR — Current documentation

The earlier speculative development plan has been replaced by documentation of the actual four-route browser AR walking-wayfinding application. Historical proposals remain recoverable in Git history; they are not a roadmap or evidence of shipped features.

Start with:

- [Project overview and documentation index](PROJECT-OVERVIEW.md)
- [Local app setup](../web/README.md)
- [Architecture and navigation behavior](ARCHITECTURE.md)
- [Current design decisions, references, and verification](REDESIGN-PLAN.md)
- [Migration lessons and sensor caveats](MIGRATION-PLAN.md)

The implementation retains 15 fixed destination records, existing walking routing, local A-Frame/AR.js scripts, and Formspree. Neutral labels are presentation-only. There is no search, authentication, database, offline navigation, or automatic rerouting. Physical-device validation remains required, and no configured deployment target is asserted here.
