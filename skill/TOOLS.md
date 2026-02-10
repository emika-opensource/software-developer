# Dev Workshop API Reference

Base: same origin (port 3000)

## Projects
| Method | Endpoint | Body |
|--------|----------|------|
| GET | /api/projects | - |
| POST | /api/projects | {name, description, status, stack, architecture, features, milestones, notes} |
| PUT | /api/projects/:id | partial update |
| DELETE | /api/projects/:id | - |
| POST | /api/projects/from-template | {templateId, name} |

## Templates (read-only)
| GET | /api/templates | |
| GET | /api/templates/:id | |

## Stacks (read-only)
| GET | /api/stacks | ?category=frontend|backend|database|hosting|auth |

## Integrations (read-only)
| GET | /api/integrations | |
| GET | /api/integrations/:id | |

## Guides
| GET | /api/guides | ?category=&projectId=&search= |
| POST | /api/guides | {title, content, category, projectId, tags} |
| PUT | /api/guides/:id | partial update |
| DELETE | /api/guides/:id | - |

## Config
| GET | /api/config | |
| PUT | /api/config | {skillLevel, preferredStack, githubUsername, timeline} |

## Analytics
| GET | /api/analytics | |
