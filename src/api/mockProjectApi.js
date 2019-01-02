
const projects = [
    {
        id: 1,
        name: 'Project 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1
    },
    {
        id: 2,
        name: 'Project 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1
    },
    {
        id: 3,
        name: 'Project 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1
    },
    {
        id: 4,
        name: 'Project 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 2
    },
    {
        id: 5,
        name: 'Project 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 3
    },
    {
        id: 6,
        name: 'Project 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 3
    }
];

const columns = [
    { name: 'Planning', stage: 1 },
    { name: 'Design', stage: 2 },
    { name: 'In Progress', stage: 3 },
    { name: 'Testing', stage: 4 },
    { name: 'Launch', stage: 5 },
];

class ProjectApi {
    static getAllProjects() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], projects));
            }, 1000);
        });
    }

    static updateProject(project, newColumn) {
        project = Object.assign({}, project);
        return new Promise((resolve) => {
            setTimeout(() => {
                project.project_stage = newColumn;
                resolve(Object.assign({}, project));
            }, 1000);
        });
    }

    static deleteProject(projectToBeDeleted) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign({}, projects.filter(project => {
                    return project.id !== projectToBeDeleted.id;
                })));
                resolve()
            }, 1000);
        });
    }

    static getAllColumns() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], columns));
            }, 1000);
        });
    }

    static addColumn(column) {
        const newColumn = {name: column, stage: 6};
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], columns, columns.push(newColumn)));
            }, 1000);
        });
    }
}

export default ProjectApi;