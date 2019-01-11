
const projects = [
    {
        id: 1,
        name: 'Project 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1,
        assignedTo: 1
    },
    {
        id: 2,
        name: 'Project 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1,
        assignedTo: 1
    },
    {
        id: 3,
        name: 'Project 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 1,
        assignedTo: 4
    },
    {
        id: 4,
        name: 'Project 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 2,
        assignedTo: 3
    },
    {
        id: 5,
        name: 'Project 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 3,
        assignedTo: 1
    },
    {
        id: 6,
        name: 'Project 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        project_stage: 3,
        assignedTo: 1
    }
];

const members = [
    {
        id: 1,
        name: 'Karl',
        projects: [6, 1, 2, 5],
    },
    {
        id: 2,
        name: 'Sandra',
        projects: [2],
    },
    {
        id: 3,
        name: 'August',
        projects: [4],
    },
    {
        id: 4,
        name: 'Clas',
        projects: [3],
    }
];

const columns = [
    { id: 1, name: 'Planning', stage: 1 },
    { id: 2, name: 'Design', stage: 2 },
    { id: 3, name: 'In Progress', stage: 3 },
    { id: 4, name: 'Testing', stage: 4 },
    { id: 5, name: 'Launch', stage: 5 },
];



function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (project) => {
    return replaceAll(project.name, ' ', '-');
};

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

    static deleteProject(project) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingProjects = projects.findIndex(project => project === project.id);
                projects.splice(existingProjects, 1);
                console.log(projects);
                resolve(project.id);
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
        const newColumn = { name: column, stage: 6 };
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], columns, columns.push(newColumn)));
            }, 1000);
        });
    }

    static deleteColumn(columnId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingColumns = columns.findIndex(col => col.id === columnId);
                columns.splice(existingColumns, 1);
                resolve(columnId)
            }, 1000);
        });
    }

    static addKanbanCard(project) {
        project = Object.assign({}, project);
        return new Promise((resolve) => {
            setTimeout(() => {
                project.id = generateId(project)
                projects.push(project);
                resolve(project)
            }, 1000);
        });
    }

    static updateKanbanCard(project) {
        project = Object.assign({}, project);
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingProject = projects.findIndex(a => a.id === project.id);
                projects.splice(existingProject, 1, project);
                resolve(project)
            }, 1000);
        });
    }

    static getAllMembers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], members));
            }, 1000);
        });
    }
}

export default ProjectApi;