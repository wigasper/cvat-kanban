# Web server organization

├── accounts
│   └── migrations
├── backend
└── kanban
    ├── fixtures
    ├── management
    │   └── commands
    └── migrations

The `accounts` app provides endpoints for token-based authentication 
from the `doser` package. The `kanban` app provides the Kanban
board backend functionality. `kanban/fixtures` provides some initial
data for testing during development.
`backend` provides the server settings and base functionality.
