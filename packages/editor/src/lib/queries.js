export const CreateOrganization = `
  mutation($name: String!) {
    createOrganization(name: $name) {
      organization {
        id
        name
      }
    }
  }
`

export const EditOrganization = `
  mutation($organizationId: ID!, $name: String!) {
    editOrganization(
      organizationId: $organizationId,
      name: $name
    ) {
      organization {
        id
        name
      }
    }
  }
`

export const AllOrganizations = `
  query {
    organizations {
      id
      name
    }
  }
`

export const Organization = `
  query($id: ID!) {
    organization(id: $id) {
      id
      name
      projects {
        id
        name
        emoji
      }
    }
  }
`

export const CreateProject = `
  mutation($name: String!, $organizationId: ID!, $emoji: String!) {
    createProject(
      name: $name,
      emoji: $emoji,
      organizationId: $organizationId
    ) {
      project {
        id
        name
      }
    }
  }
`

export const EditProject = `
  mutation($projectId: ID!, $name: String!) {
    editProject(
      projectId: $projectId,
      name: $name
    ) {
      project {
        id
        name
      }
    }
  }
`

export const Project = `
  query($id: ID!) {
    project(id: $id) {
      id
      name
      documents {
        id
        name
        emoji
      }
    }
  }
`

export const CreateDocument = `
  mutation($name: String!, $projectId: ID!) {
    createDocument(
      name: $name,
      projectId: $projectId
    ) {
      document {
        id
        name
      }
    }
  }
`

export const DeleteDocument = `
  mutation($id: ID!) {
    deleteDocument(
      id: $id
    ) {
      document {
        id
        name
      }
    }
  }
`

export const Document = `
  query($id: ID!) {
    document(id: $id) {
      id
      name
      content
      emoji
      project {
        id
        name
      }
    }
  }
`

export const EditDocument = `
  mutation ($documentId: ID!, $name: String!, $content: String!, $emoji: String) {
    editDocument(documentId: $documentId, name: $name, content: $content, emoji: $emoji) {
      document {
        name
        content
        emoji
      }
    }
  }
`
