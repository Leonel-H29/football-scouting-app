export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Football Scout Backend API',
    version: '1.0.0',
    description:
      'REST API for authentication, and football data search/comparison.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  tags: [
    { name: 'Health' },
    { name: 'Auth' },
    { name: 'Players' },
    { name: 'Teams' },
    { name: 'Seasons' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'Service is healthy',
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
          },
          400: {
            description: 'Invalid payload',
          },
          409: {
            description: 'Email or username already exists',
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
          },
          400: {
            description: 'Invalid payload',
          },
          401: {
            description: 'Invalid credentials',
          },
        },
      },
    },
    '/api/players': {
      get: {
        tags: ['Players'],
        summary: 'Search players',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'name',
            in: 'query',
            schema: { type: 'string', minLength: 1, maxLength: 100 },
          },
          {
            name: 'position',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'],
            },
          },
          {
            name: 'nationality',
            in: 'query',
            schema: { type: 'string', minLength: 2, maxLength: 56 },
          },
          {
            name: 'minAge',
            in: 'query',
            schema: { type: 'integer', minimum: 15, maximum: 50 },
          },
          {
            name: 'maxAge',
            in: 'query',
            schema: { type: 'integer', minimum: 15, maximum: 50 },
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1,
            },
            description: 'Page number (starts at 1)',
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 20,
            },
            description: 'Number of items per page',
          },
        ],
        responses: {
          200: {
            description: 'Players returned successfully',
          },
          400: {
            description: 'Invalid query parameters',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/players/compare': {
      post: {
        tags: ['Players'],
        summary: 'Compare players',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['playerIds'],
                properties: {
                  playerIds: {
                    type: 'array',
                    minItems: 2,
                    maxItems: 3,
                    uniqueItems: true,
                    items: { type: 'string', minLength: 1, maxLength: 100 },
                  },
                  seasonId: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Comparison returned successfully',
          },
          400: {
            description: 'Invalid payload',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Players or season not found',
          },
        },
      },
    },
    '/api/teams': {
      get: {
        tags: ['Teams'],
        summary: 'List teams',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'name',
            in: 'query',
            schema: { type: 'string', minLength: 2, maxLength: 100 },
          },
          {
            name: 'country',
            in: 'query',
            schema: { type: 'string', minLength: 2, maxLength: 56 },
          },
        ],
        responses: {
          200: {
            description: 'Teams returned successfully',
          },
          400: {
            description: 'Invalid query parameters',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/seasons': {
      get: {
        tags: ['Seasons'],
        summary: 'List seasons',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'year',
            in: 'query',
            schema: { type: 'integer', minimum: 1900, maximum: 2100 },
          },
          {
            name: 'name',
            in: 'query',
            schema: { type: 'string', minLength: 1, maxLength: 100 },
          },
        ],
        responses: {
          200: {
            description: 'Seasons returned successfully',
          },
          400: {
            description: 'Invalid query parameters',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        required: [
          'name',
          'surname',
          'email',
          'username',
          'password',
          'confirmPassword',
        ],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 60 },
          surname: { type: 'string', minLength: 2, maxLength: 60 },
          email: {
            type: 'string',
            format: 'email',
            minLength: 6,
            maxLength: 254,
          },
          username: { type: 'string', minLength: 4, maxLength: 30 },
          password: { type: 'string', minLength: 8, maxLength: 128 },
          confirmPassword: { type: 'string', minLength: 8, maxLength: 128 },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 4, maxLength: 30 },
          password: { type: 'string', minLength: 8, maxLength: 128 },
        },
      },
      Position: {
        type: 'string',
        enum: ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'],
      },
      Team: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          country: { type: 'string' },
          logoUrl: { type: 'string', format: 'uri' },
        },
        required: ['id', 'name', 'country', 'logoUrl'],
      },
      Season: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          year: { type: 'integer' },
          name: { type: 'string' },
        },
        required: ['id', 'year', 'name'],
      },
      Player: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          birthDate: { type: 'string', format: 'date-time' },
          age: { type: 'integer' },
          nationality: { type: 'string' },
          position: { $ref: '#/components/schemas/Position' },
          photoUrl: { type: 'string', format: 'uri' },
          currentTeam: { $ref: '#/components/schemas/Team' },
        },
        required: [
          'id',
          'name',
          'birthDate',
          'age',
          'nationality',
          'position',
          'photoUrl',
          'currentTeam',
        ],
      },
      PlayerStat: {
        type: 'object',
        properties: {
          season: { $ref: '#/components/schemas/Season' },
          matchesPlayed: { type: 'integer' },
          starts: { type: 'integer' },
          goals: { type: 'integer' },
          assists: { type: 'integer' },
          yellowCards: { type: 'integer' },
          redCards: { type: 'integer' },
          minutesPlayed: { type: 'integer' },
          shots: { type: 'integer' },
          shotsOnTarget: { type: 'integer' },
          keyPasses: { type: 'integer' },
          tackles: { type: 'integer' },
          interceptions: { type: 'integer' },
          dribblesCompleted: { type: 'integer' },
          passAccuracy: { type: 'number' },
        },
        required: [
          'season',
          'matchesPlayed',
          'starts',
          'goals',
          'assists',
          'yellowCards',
          'redCards',
          'minutesPlayed',
          'shots',
          'shotsOnTarget',
          'keyPasses',
          'tackles',
          'interceptions',
          'dribblesCompleted',
          'passAccuracy',
        ],
      },
      SearchPlayerResult: {
        type: 'object',
        properties: {
          player: { $ref: '#/components/schemas/Player' },
          latestStat: {
            oneOf: [{ $ref: '#/components/schemas/PlayerStat' }],
            nullable: true,
          },
        },
        required: ['player', 'latestStat'],
      },
      ComparisonValue: {
        type: 'object',
        properties: {
          playerId: { type: 'string' },
          playerName: { type: 'string' },
          value: {
            oneOf: [{ type: 'number' }, { type: 'string' }],
            nullable: true,
          },
        },
        required: ['playerId', 'playerName', 'value'],
      },
      ComparisonRow: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          label: { type: 'string' },
          values: {
            type: 'array',
            items: { $ref: '#/components/schemas/ComparisonValue' },
          },
        },
        required: ['key', 'label', 'values'],
      },
      ComparisonResult: {
        type: 'object',
        properties: {
          season: {
            oneOf: [{ $ref: '#/components/schemas/Season' }],
            nullable: true,
          },
          players: {
            type: 'array',
            items: { $ref: '#/components/schemas/Player' },
          },
          rows: {
            type: 'array',
            items: { $ref: '#/components/schemas/ComparisonRow' },
          },
        },
        required: ['season', 'players', 'rows'],
      },
    },
  },
} as const;
