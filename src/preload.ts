import {
    contextBridge,
    ipcRenderer,
    webUtils
} from "electron";


contextBridge.exposeInMainWorld(
    "electronAPI",
    {

        getProjectYears: () =>
            ipcRenderer.invoke(
                "get-project-years"
            ),


        getProjectMonths: (
            year: string
        ) =>
            ipcRenderer.invoke(
                "get-project-months",
                year
            ),


        getProjects: (
            year: string,
            month: string
        ) =>
            ipcRenderer.invoke(
                "get-projects",
                year,
                month
            ),

        getProjectContents: (
            yearOrPath: string,
            month?: string,
            projectName?: string
        ) =>
            ipcRenderer.invoke(
                "get-project-contents",
                yearOrPath,
                month,
                projectName
            ),

        getProjectFolderContents: (
            yearOrPath: string,
            month: string,
            projectName?: string,
            folderName?: string
        ) =>
            ipcRenderer.invoke(
                "get-project-folder-contents",
                yearOrPath,
                month,
                projectName,
                folderName
            ),

        createProject: (
            year: string,
            month: string,
            projectName: string,
            details?: { description?: string; status?: ProjectStatus; project_type?: ProjectType; deadline?: string; created_at?: string; }
        ) =>
            ipcRenderer.invoke(
                "create-project",
                year,
                month,
                projectName,
                details
            ),

        updateProjectDetails: (
            ...args: [string, ProjectUpdateDetails] | [string, string, string, ProjectUpdateDetails]
        ) => ipcRenderer.invoke("update-project-details", ...args),

        toggleProjectPin: (
            year: string, month: string, projectName: string
        ) => ipcRenderer.invoke("toggle-project-pin", year, month, projectName),

        toggleProjectPinByPath: (
            projectPath: string
        ) => ipcRenderer.invoke("toggle-project-pin-by-path", projectPath),

        getPinnedProjects: () => ipcRenderer.invoke("get-pinned-projects"),

        getRecurringProjects: () => ipcRenderer.invoke("get-recurring-projects"),

        getDashboardData: () => ipcRenderer.invoke("get-dashboard-data"),

        punchIn: () => ipcRenderer.invoke("punch-in"),

        punchOut: () => ipcRenderer.invoke("punch-out"),

        getAttendanceData: () => ipcRenderer.invoke("get-attendance-data"),

        getMonthlyAttendance: (year?: number, month?: number) =>
            ipcRenderer.invoke("get-monthly-attendance", year, month),

        createAttendanceRecord: (record: { date: string; punchIn?: string; punchOut?: string; attendanceType?: "regular" | "leave" | "holiday" }) =>
            ipcRenderer.invoke("create-attendance-record", record),

        updateAttendanceRecord: (id: string, record: { date: string; punchIn?: string; punchOut?: string; attendanceType: "regular" | "leave" | "holiday"; replaceDateRecords?: boolean }) =>
            ipcRenderer.invoke("update-attendance-record", id, record),

        deleteAttendanceRecord: (id: string) =>
            ipcRenderer.invoke("delete-attendance-record", id),

        getProjectsRoot: () =>
            ipcRenderer.invoke(
                "get-projects-root"
            ),

        getSettings: () => ipcRenderer.invoke("get-settings"),
        setAttendancePreferences: (preferences: { userName: string; quotes: string[]; targetAttendanceSeconds: number }) =>
            ipcRenderer.invoke("set-attendance-preferences", preferences),

        chooseProjectsRoot: () =>
            ipcRenderer.invoke(
                "choose-projects-root"
            ),

        setProjectsRoot: (
            projectsRoot: string
        ) =>
            ipcRenderer.invoke(
                "set-projects-root",
                projectsRoot
            ),

            chooseRecurringProjectsRoot: () => ipcRenderer.invoke("choose-recurring-projects-root"),
            setRecurringProjectsRoot: (root: string) => ipcRenderer.invoke("set-recurring-projects-root", root),
            setAccentColor: (color: string) => ipcRenderer.invoke("set-accent-color", color),

        getDirectoryItems: (
            type: "label" | "person"
        ) =>
            ipcRenderer.invoke(
                "get-directory-items",
                type
            ),

        createDirectoryItem: (
            type: "label" | "person",
            item: { name: string; color: string; }
        ) =>
            ipcRenderer.invoke(
                "create-directory-item",
                type,
                item
            ),

        updateDirectoryItem: (
            type: "label" | "person",
            item: { id: string; name: string; color: string; }
        ) =>
            ipcRenderer.invoke(
                "update-directory-item",
                type,
                item
            ),

        deleteDirectoryItem: (
            type: "label" | "person",
            id: string
        ) =>
            ipcRenderer.invoke(
                "delete-directory-item",
                type,
                id
            ),

        getProjectTags: (
            year: string,
            month: string,
            projectName: string
        ) =>
            ipcRenderer.invoke(
                "get-project-tags",
                year,
                month,
                projectName
            ),

        setProjectTags: (
            year: string,
            month: string,
            projectName: string,
            tags: { labelIds: string[]; personIds: string[]; }
        ) =>
            ipcRenderer.invoke(
                "set-project-tags",
                year,
                month,
                projectName,
                tags
            ),

        getProjectNotes: (
            ...args: [string] | [string, string, string]
        ) => ipcRenderer.invoke("get-project-notes", ...args),

        getAllNotes: () =>
            ipcRenderer.invoke("get-all-notes"),

        createNote: (
            year: string,
            month: string,
            projectName: string,
            content?: string,
            title?: string
        ) =>
            ipcRenderer.invoke(
                "create-note",
                year,
                month,
                projectName,
                content ?? "",
                title ?? ""
            ),

        updateNote: (
            noteId: string,
            content: string,
            title?: string,
            projectId?: string | null
        ) =>
            ipcRenderer.invoke(
                "update-note",
                noteId,
                content,
                title ?? "",
                projectId
            ),

        deleteNote: (noteId: string) =>
            ipcRenderer.invoke(
                "delete-note",
                noteId
            ),

        openProjectContent: (
            ...args: [string, string] | [string, string, string, string]
        ) => ipcRenderer.invoke("open-project-content", ...args),

        copyProjectPath: (projectPath: string) =>
            ipcRenderer.invoke("copy-project-path", projectPath),

        getDroppedFilePath: (file: File) => webUtils.getPathForFile(file),

        importProjectFiles: (projectPath: string, targetFolder: string, sourcePaths: string[]) =>
            ipcRenderer.invoke("import-project-files", projectPath, targetFolder, sourcePaths),

        startFileDrag: (projectPath: string, relativePaths: string[]) =>
            ipcRenderer.send("start-file-drag", projectPath, relativePaths),

        renameFile: (
            year: string,
            month: string,
            projectName: string,
            fileName: string,
            nextFileName: string
        ) =>
            ipcRenderer.invoke(
                "rename-file",
                year,
                month,
                projectName,
                fileName,
                nextFileName
            ),

        duplicateFile: (
            year: string,
            month: string,
            projectName: string,
            fileName: string
        ) =>
            ipcRenderer.invoke(
                "duplicate-file",
                year,
                month,
                projectName,
                fileName
            ),

        deleteFile: (
            year: string,
            month: string,
            projectName: string,
            fileName: string
        ) =>
            ipcRenderer.invoke(
                "delete-file",
                year,
                month,
                projectName,
                fileName
            ),

        renameProject: (
            year: string,
            month: string,
            projectName: string,
            nextProjectName: string
        ) =>
            ipcRenderer.invoke(
                "rename-project",
                year,
                month,
                projectName,
                nextProjectName
            ),

        duplicateProject: (
            year: string,
            month: string,
            projectName: string
        ) =>
            ipcRenderer.invoke(
                "duplicate-project",
                year,
                month,
                projectName
            ),

        deleteProject: (
            year: string,
            month: string,
            projectName: string
        ) =>
            ipcRenderer.invoke(
                "delete-project",
                year,
                month,
                projectName
            ),

    }
);
