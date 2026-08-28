// ==========================================
// 1. ELEMENTS
// ==========================================

const addNoteBtn =
    document.querySelector("#addNoteBtn");

const noteModal =
    document.querySelector("#noteModal");

const closeModalBtn =
    document.querySelector("#closeModalBtn");

const noteForm =
    document.querySelector("#noteForm");

const noteTitle =
    document.querySelector("#noteTitle");

const noteContent =
    document.querySelector("#noteContent");

const categoryInput =
    document.querySelector("#categoryInput");

const notesContainer =
    document.querySelector("#notesContainer");

const totalCount =
    document.querySelector("#totalCount");

const pinnedCount =
    document.querySelector("#pinnedCount");

const emptyMessage =
    document.querySelector("#emptyMessage");

const filters =
    document.querySelector(".filters");

const searchInput =
    document.querySelector("#searchInput");

const themeBtn =
    document.querySelector("#themeBtn");

const deleteAllBtn =
    document.querySelector("#deleteAllBtn");

const modalTitle =
    document.querySelector("#modalTitle");


// ==========================================
// VIEW ELEMENTS
// ==========================================

const viewModal =
    document.querySelector("#viewModal");

const viewTitle =
    document.querySelector("#viewTitle");

const viewCategory =
    document.querySelector("#viewCategory");

const viewDate =
    document.querySelector("#viewDate");

const viewText =
    document.querySelector("#viewText");

const closeViewBtn =
    document.querySelector("#closeViewBtn");

const closeViewButton =
    document.querySelector("#closeViewButton");

const copyNoteBtn =
    document.querySelector("#copyNoteBtn");


// ==========================================
// 2. STATE
// ==========================================

let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];


let editingId = null;

let currentFilter = "all";


// ==========================================
// 3. SAVE NOTES
// ==========================================

function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


// ==========================================
// 4. OPEN NEW NOTE
// ==========================================

addNoteBtn.addEventListener(
    "click",
    function () {

        editingId = null;

        modalTitle.textContent =
            "New Note";

        noteForm.reset();


        document.querySelector(
            'input[name="noteColor"][value="yellow"]'
        ).checked = true;


        noteModal.classList.remove(
            "hidden"
        );


        noteTitle.focus();

    }
);


// ==========================================
// 5. CLOSE NOTE MODAL
// ==========================================

closeModalBtn.addEventListener(
    "click",
    closeNoteModal
);


function closeNoteModal() {

    noteModal.classList.add(
        "hidden"
    );

    editingId = null;

}


// ==========================================
// 6. ADD / EDIT NOTE
// ==========================================

noteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            noteTitle.value.trim();


        const content =
            noteContent.value.trim();


        if (title === "") {

            alert(
                "Note title is empty."
            );

            return;

        }


        if (content === "") {

            alert(
                "Note content is empty."
            );

            return;

        }


        const selectedColor =
            document.querySelector(
                'input[name="noteColor"]:checked'
            ).value;


        // ======================================
        // EDIT
        // ======================================

        if (editingId !== null) {

            const note =
                notes.find(
                    function (item) {

                        return (
                            item.id ===
                            editingId
                        );

                    }
                );


            if (note) {

                note.noteTitle =
                    title;

                note.noteContent =
                    content;

                note.categoryInput =
                    categoryInput.value;

                note.colorOptions =
                    selectedColor;

            }

        }


        // ======================================
        // NEW NOTE
        // ======================================

        else {

            const now =
                Date.now();


            const newNote = {

                id: now,

                noteTitle:
                    title,

                noteContent:
                    content,

                categoryInput:
                    categoryInput.value,

                colorOptions:
                    selectedColor,

                pinned:
                    false,

                order:
                    now,

                createdAt:
                    new Date()
                        .toLocaleString()

            };


            notes.push(
                newNote
            );

        }


        saveNotes();


        noteForm.reset();


        closeNoteModal();


        render();

    }
);


// ==========================================
// 7. FILTER
// ==========================================

filters.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".filter"
            );


        if (!button) {

            return;

        }


        currentFilter =
            button.dataset.category;


        document
            .querySelectorAll(".filter")
            .forEach(
                function (filter) {

                    filter.classList.remove(
                        "active"
                    );

                }
            );


        button.classList.add(
            "active"
        );


        render();

    }
);


// ==========================================
// 8. DELETE NOTE
// ==========================================

function delBtn(id) {

    notes =
        notes.filter(
            function (note) {

                return (
                    note.id !== id
                );

            }
        );


    saveNotes();

    render();

}


// ==========================================
// 9. PIN NOTE
// ==========================================

function pinBtn(id) {

    const note =
        notes.find(
            function (item) {

                return (
                    item.id === id
                );

            }
        );


    if (!note) {

        return;

    }


    note.pinned =
        !note.pinned;


    saveNotes();

    render();

}


// ==========================================
// 10. EDIT NOTE
// ==========================================

function editBtn(id) {

    const note =
        notes.find(
            function (item) {

                return (
                    item.id === id
                );

            }
        );


    if (!note) {

        return;

    }


    editingId =
        id;


    modalTitle.textContent =
        "Edit Note";


    noteTitle.value =
        note.noteTitle;


    noteContent.value =
        note.noteContent;


    categoryInput.value =
        note.categoryInput;


    const colorRadio =
        document.querySelector(
            `input[name="noteColor"][value="${note.colorOptions}"]`
        );


    if (colorRadio) {

        colorRadio.checked =
            true;

    }


    noteModal.classList.remove(
        "hidden"
    );


    noteTitle.focus();

}


// ==========================================
// 11. VIEW COMPLETE NOTE
// ==========================================

function viewNote(id) {

    const note =
        notes.find(
            function (item) {

                return (
                    item.id === id
                );

            }
        );


    if (!note) {

        return;

    }


    // TITLE
    viewTitle.textContent =
        note.noteTitle;


    // CATEGORY
    viewCategory.textContent =
        note.categoryInput;


    // DATE
    viewDate.textContent =
        note.createdAt;


    // COMPLETE NOTE
    viewText.textContent =
        note.noteContent;


    // ======================================
    // REMOVE OLD COLOR
    // ======================================

    viewModal.classList.remove(
        "view-yellow",
        "view-blue",
        "view-green",
        "view-pink"
    );


    // ======================================
    // ADD SELECTED NOTE COLOR
    // ======================================

    viewModal.classList.add(
        "view-" + note.colorOptions
    );


    // SHOW FULL SCREEN
    viewModal.classList.remove(
        "hidden"
    );

}


// ==========================================
// 12. CLOSE FULL SCREEN VIEW
// ==========================================

function closeView() {

    viewModal.classList.add(
        "hidden"
    );

}


closeViewBtn.addEventListener(
    "click",
    closeView
);


closeViewButton.addEventListener(
    "click",
    closeView
);


// ==========================================
// 13. COPY COMPLETE NOTE
// ==========================================

copyNoteBtn.addEventListener(
    "click",
    async function () {

        const text =
            viewText.textContent;


        if (!text) {

            return;

        }


        try {

            await navigator.clipboard.writeText(
                text
            );


            copyNoteBtn.textContent =
                "✅ Copied!";


            setTimeout(
                function () {

                    copyNoteBtn.textContent =
                        "📋 Copy Note";

                },
                1500
            );


        }

        catch (error) {

            /*
               Fallback for browsers where
               Clipboard API is unavailable.
            */

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                text;


            document.body.appendChild(
                textarea
            );


            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();


            copyNoteBtn.textContent =
                "✅ Copied!";


            setTimeout(
                function () {

                    copyNoteBtn.textContent =
                        "📋 Copy Note";

                },
                1500
            );

        }

    }
);


// ==========================================
// 14. CLICK OUTSIDE ADD NOTE MODAL
// ==========================================

noteModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            noteModal
        ) {

            closeNoteModal();

        }

    }
);


// ==========================================
// 15. DARK MODE
// ==========================================

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        themeBtn.textContent =
            isDark
                ? "🌑"
                : "🌞";


        localStorage.setItem(
            "theme",
            isDark
                ? "dark"
                : "light"
        );

    }
);


// ==========================================
// 16. LOAD THEME
// ==========================================

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme ===
    "dark"
) {

    document.body.classList.add(
        "dark"
    );


    themeBtn.textContent =
        "🌑";

}


// ==========================================
// 17. UPDATE STATS
// ==========================================

function updateStats() {

    totalCount.textContent =
        notes.length;


    const pinned =
        notes.filter(
            function (note) {

                return note.pinned;

            }
        ).length;


    pinnedCount.textContent =
        pinned;

}


// ==========================================
// 18. CREATE NOTE HTML
// ==========================================

function createNoteHtml(note) {

    const pinIcon =
        note.pinned
            ? "📌"
            : "";


    const maxPreviewLength =
        180;


    const isLong =
        note.noteContent.length >
        maxPreviewLength;


    const preview =
        isLong
            ? note.noteContent.substring(
                0,
                maxPreviewLength
            ) + "..."
            : note.noteContent;


    const viewMoreButton =
        isLong
            ? `
                <button
                    class="view-more"
                    type="button"
                    onclick="viewNote(${note.id})"
                >
                    View More 👀
                </button>
              `
            : "";


    return `

        <article
            class="note-card ${note.colorOptions}"
        >

            <div class="note-header">

                <h2 class="note-title">
                    ${escapeHtml(
                        note.noteTitle
                    )}
                </h2>


                <span class="pin-icon">
                    ${pinIcon}
                </span>

            </div>


            <div class="note-content">

                ${escapeHtml(
                    preview
                )}

            </div>


            ${viewMoreButton}


            <div class="note-actions">

                <button
                    class="edit-note"
                    type="button"
                    onclick="editBtn(${note.id})"
                >
                    Edit
                </button>


                <button
                    class="pin-note"
                    type="button"
                    onclick="pinBtn(${note.id})"
                >
                    ${
                        note.pinned
                            ? "Unpin 📌"
                            : "Pin"
                    }
                </button>


                <button
                    class="delete-note"
                    type="button"
                    onclick="delBtn(${note.id})"
                >
                    Delete
                </button>

            </div>


            <div class="note-footer">

                <span class="note-category">

                    ${escapeHtml(
                        note.categoryInput
                    )}

                </span>


                <span class="note-date">

                    ${escapeHtml(
                        note.createdAt
                    )}

                </span>

            </div>

        </article>

    `;

}


// ==========================================
// 19. FILTER + SEARCH
// ==========================================

function getFilteredNotes() {

    let result =
        [...notes];


    // CATEGORY

    if (
        currentFilter !==
        "all"
    ) {

        result =
            result.filter(
                function (note) {

                    return (
                        note.categoryInput ===
                        currentFilter
                    );

                }
            );

    }


    // SEARCH

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    if (
        search !== ""
    ) {

        result =
            result.filter(
                function (note) {

                    return (

                        note.noteTitle
                            .toLowerCase()
                            .includes(
                                search
                            )

                        ||

                        note.noteContent
                            .toLowerCase()
                            .includes(
                                search
                            )

                    );

                }
            );

    }


    // PINNED FIRST

    result.sort(
        function (a, b) {

            if (
                a.pinned !==
                b.pinned
            ) {

                return (
                    b.pinned -
                    a.pinned
                );

            }


            return (
                b.order -
                a.order
            );

        }
    );


    return result;

}


// ==========================================
// 20. RENDER
// ==========================================

function render() {

    const result =
        getFilteredNotes();


    notesContainer.innerHTML =
        "";


    result.forEach(
        function (note) {

            notesContainer.innerHTML +=
                createNoteHtml(
                    note
                );

        }
    );


    if (
        result.length ===
        0
    ) {

        emptyMessage.textContent =
            notes.length === 0
                ? "No notes yet. Create your first note."
                : "No notes found.";


        emptyMessage.style.display =
            "block";

    }

    else {

        emptyMessage.style.display =
            "none";

    }


    updateStats();

}


// ==========================================
// 21. DELETE ALL
// ==========================================

deleteAllBtn.addEventListener(
    "click",
    function () {

        if (
            notes.length ===
            0
        ) {

            return;

        }


        const confirmDelete =
            confirm(
                "Are you sure you want to delete all notes?"
            );


        if (
            !confirmDelete
        ) {

            return;

        }


        notes = [];


        saveNotes();


        render();

    }
);


// ==========================================
// 22. SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        render();

    }
);


// ==========================================
// 23. ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


// ==========================================
// 24. INITIAL RENDER
// ==========================================

render();
