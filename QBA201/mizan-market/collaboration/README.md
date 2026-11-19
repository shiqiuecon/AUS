# Mizan Market workspace on GitHub Pages

These HTML, CSS and JavaScript files are published by the existing `shiqiuecon/AUS` Pages deployment. `index.html` opens an explicitly labeled read-only sample; both 60- and 75-minute dashboard links are provided.

The participant and instructor pages use `runtime.js` to contact a classroom API configured in `config.js`. `apiOrigin: null` intentionally disables live setup until an actual compatible server has been deployed. Do not point it to the earlier server without enabling the required cross-origin requests and late-observer migration there.

Only client code and fictional sample data belong in this public repository. Keep instructor passcodes, authentication tokens, student records, grading definitions and the server code outside the public Pages tree. GitHub Pages cannot execute the database or API.

Live activation: deploy the compatible classroom server; verify its health endpoint and allowed web origin; set `apiOrigin` to its HTTPS origin in `config.js`; test section creation, QR check-in, timed rounds, exports and late observers in both class lengths; then switch the course activity links to `host.html` and `lobby.html`. Until activation, existing class links continue to use the current classroom service.
