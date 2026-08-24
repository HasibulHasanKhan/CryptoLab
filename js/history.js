// ========================================
// CryptoLab History System
// ========================================

const HISTORY_KEY = "cryptolab_history";

// Get history

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

// Save history

function saveHistory(history) {
  localStorage.setItem(
    HISTORY_KEY,

    JSON.stringify(history),
  );
}

// Escape HTML

function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = String(value);

  return div.innerHTML;
}

// Add history item

function addHistory(
  algorithm,

  operation,

  message,

  key,

  result,
) {
  const history = getHistory();

  history.unshift({
    id: Date.now() + Math.random(),

    algorithm,

    operation,

    message,

    key,

    result,

    timestamp: new Date().toLocaleString(),
  });

  // Keep latest 50 records

  saveHistory(history.slice(0, 50));

  renderHistory();
}

// Delete history

function deleteHistory(id) {
  const updated = getHistory().filter((item) => String(item.id) !== String(id));

  saveHistory(updated);

  renderHistory();
}

// Render history

function renderHistory() {
  const container = document.getElementById("historyList");

  if (!container) {
    return;
  }

  const history = getHistory();

  if (history.length === 0) {
    container.innerHTML = `

            <p class="help-text">

                📭 No encryption history yet.

            </p>

        `;

    return;
  }

  container.innerHTML = history
    .map(
      (item) => `

                <article
                    class="history-card"
                >

                    <div
                        class="history-header"
                    >

                        <div>

                            <strong>
                                ${escapeHTML(item.algorithm)}
                            </strong>


                            <span
                                class="operation-badge"
                            >

                                ${escapeHTML(item.operation)}

                            </span>

                        </div>


                        <small>

                            ${escapeHTML(item.timestamp)}

                        </small>

                    </div>


                    <div
                        class="history-content"
                    >

                        <p>

                            <strong>
                                Message:
                            </strong>

                            ${escapeHTML(item.message)}

                        </p>


                        <p>

                            <strong>
                                Key:
                            </strong>

                            ${escapeHTML(item.key)}

                        </p>


                        <p
                            class="history-result"
                        >

                            <strong>
                                Result:
                            </strong>

                            ${escapeHTML(item.result)}

                        </p>

                    </div>


                    <button

                        class="delete-history"

                        data-id="${item.id}"

                    >

                        Delete

                    </button>

                </article>

            `,
    )
    .join("");

  // Add delete listeners

  document.querySelectorAll(".delete-history").forEach((button) => {
    button.onclick = () => deleteHistory(button.dataset.id);
  });
}

// Download file

function downloadBlob(data, filename, type) {
  const blob = new Blob(
    [data],

    {
      type,
    },
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = filename;

  link.click();

  setTimeout(
    () => URL.revokeObjectURL(url),

    1000,
  );
}

// Export history

function exportHistory() {
  const history = getHistory();

  if (history.length === 0) {
    showError("There is no history to export.");

    return;
  }

  downloadBlob(
    JSON.stringify(history, null, 2),

    "cryptolab-history.json",

    "application/json",
  );
}
const HISTORY_KEY = "cryptolab_history";

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistoryItem(item) {
  const history = getHistory();

  history.unshift(item);

  const limitedHistory = history.slice(0, 50);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));

  renderHistory();
}

function deleteHistoryItem(index) {
  const history = getHistory();

  history.splice(index, 1);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  renderHistory();
}

function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);

  renderHistory();
}

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderHistory() {
  const historyList = document.getElementById("historyList");

  if (!historyList) {
    return;
  }

  const history = getHistory();

  if (history.length === 0) {
    historyList.innerHTML = "No history available.";

    return;
  }

  historyList.innerHTML = history
    .map(
      (item, index) => `

                    <div class="history-item">

                        <div class="history-header">

                            <strong>
                                ${escapeHTML(item.algorithm)}
                                -
                                ${escapeHTML(item.operation)}
                            </strong>

                            <span class="history-meta">
                                ${escapeHTML(item.time)}
                            </span>

                        </div>

                        <div class="history-data">
                            <strong>Input:</strong>
                            ${escapeHTML(item.input)}
                        </div>

                        <div class="history-data">
                            <strong>Result:</strong>
                            ${escapeHTML(item.result)}
                        </div>

                        <button
                            class="history-delete"
                            onclick="deleteHistoryItem(${index})"
                        >
                            Delete
                        </button>

                    </div>

                `,
    )
    .join("");
}

function exportHistoryJSON() {
  const history = getHistory();

  const blob = new Blob([JSON.stringify(history, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "cryptolab-history.json";

  link.click();

  URL.revokeObjectURL(url);
}
