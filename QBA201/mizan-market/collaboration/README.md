# Mizan Market workspace on GitHub Pages

The existing `shiqiuecon/AUS` Pages deployment hosts these HTML, CSS and JavaScript files. The dashboard, participant workspace and course entry use the existing QBA201 classroom API, configured in `config.js`. Both 60- and 75-minute sections share this interface.

The server permits authenticated browser requests from `https://shiqiuecon.github.io` and its own origin. Instructor and member credentials still apply. The application stores teams, answers, votes and archives in the existing classroom database. No records or secrets are stored in this public repository.

Late arrivals can check in to existing populated teams as read-only observers after the competing rosters are locked. Their names appear in the team workspace and instructor dashboard, but they cannot claim a role, submit answers or vote and are excluded from team bonuses. The current-section QR routes to GitHub-hosted check-in.

The fictional read-only sample remains available with `preview=sample`; ordinary course links open the live interface. Grading definitions and server source stay outside the public Pages tree.
