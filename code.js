document.addEventListener('DOMContentLoaded', () => {
    // Page elements
    const signupPage = document.getElementById('signupPage');
    const homePage = document.getElementById('homePage');

    // Signup Page elements
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const privacyLink = document.getElementById('privacyLink');
    const aboutUsLink = document.getElementById('aboutUsLink');

    // Home Page elements
    const menuBtn = document.getElementById('menuBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const addItemBtn = document.getElementById('addItemBtn');
    const checkBtn = document.getElementById('checkBtn');
    const keepSafeBtn = document.getElementById('keepSafeBtn');
    const historyBtn = document.getElementById('historyBtn');
    const safeBtn = document.getElementById('safeBtn'); // For potential filtering
    const unsafeBtn = document.getElementById('unsafeBtn'); // For potential filtering

    const statusDisplay = document.getElementById('statusDisplay');
    const keepSafeContent = document.getElementById('keepSafeContent');
    const keptSafeList = document.getElementById('keptSafeList');
    const historyContent = document.getElementById('historyContent');
    const scanHistoryList = document.getElementById('scanHistoryList');

    // Modal elements
    const infoModal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // App state (simple in-memory store)
    let currentItemToCheck = null;
    let lastScanResult = null; // 'safe', 'unsafe', or null
    const keptSafeItems = [];
    const scanHistory = [];

    // --- Page Navigation ---
    googleSignInBtn.addEventListener('click', () => {
        signupPage.classList.add('hidden');
        homePage.classList.remove('hidden');
        // In a real app, actual Google Sign-In logic would go here
        console.log("Simulating Google Sign-In...");
    });

    // --- Modal Logic ---
    function showModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content; // Use innerHTML if content includes HTML tags
        infoModal.classList.remove('hidden');
    }

    closeModalBtn.addEventListener('click', () => {
        infoModal.classList.add('hidden');
    });

    // Close modal if clicking outside of it
    infoModal.addEventListener('click', (event) => {
        if (event.target === infoModal) {
            infoModal.classList.add('hidden');
        }
    });


    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        const privacyPolicyText = `
            <h4 class="font-semibold mb-2">Privacy Policy for Keep Safer</h4>
            <p class="mb-2">Last updated: ${new Date().toLocaleDateString()}</p>
            <p class="mb-2">We are committed to protecting your privacy. This app, "Keep Safer", is designed to help you check and secure your phone data locally on your device.</p>
            <p class="mb-2"><strong>Information We Collect:</strong> We do not collect any personal information. All data checks (links, files, apps, photos, videos, SMS, texts) are processed locally on your device. No data is transmitted to our servers or any third-party servers.</p>
            <p class="mb-2"><strong>How We Use Your Information:</strong> Since we don't collect your information, we don't use it for any purpose other than the app's functionality on your device.</p>
            <p class="mb-2"><strong>Data Storage:</strong> Any items you mark to "Keep Safe" or your scan "History" are stored locally on your device's storage, accessible only by the app. If you uninstall the app, this data may be removed.</p>
            <p class="mb-2"><strong>Third-Party Services:</strong> The app may offer a "Sign in with Google" feature. If you use this, Google's privacy policy will apply to the authentication process. We only receive a token for authentication and do not store your Google credentials.</p>
            <p class="mb-2"><strong>Security:</strong> We strive to make the app secure. However, please be aware that no method of electronic storage or transmission over the internet is 100% secure.</p>
            <p class="mb-2"><strong>Changes to This Privacy Policy:</strong> We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            <p>If you have any questions about this Privacy Policy, please contact us at support@keepsafer.example.com.</p>
        `;
        showModal("Privacy Policy", privacyPolicyText);
    });

    aboutUsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutUsText = `
            <h4 class="font-semibold mb-2">About Keep Safer</h4>
            <p class="mb-2">"Keep Safer" is a mobile application designed to empower users to take control of their phone's data security.</p>
            <p class="mb-2"><strong>Our Mission:</strong> To provide a simple, secure, and easy-to-navigate tool that helps you identify potentially unsafe content on your device and manage your digital safety.</p>
            <p class="mb-2"><strong>Features:</strong></p>
            <ul class="list-disc list-inside ml-4 mb-2">
                <li>Scan various content types (links, files, apps, etc.).</li>
                <li>Categorize items as safe or unsafe.</li>
                <li>Securely store references to items you've deemed safe.</li>
                <li>Review your scan history.</li>
            </ul>
            <p class="mb-2">This application was developed with user privacy and ease of use as top priorities.</p>
            <p>Thank you for using Keep Safer!</p>
        `;
        showModal("About Us", aboutUsText);
    });


    // --- Home Page Logic ---
    menuBtn.addEventListener('click', () => {
        console.log("Menu button clicked - Implement navigation/sidebar");
        alert("Menu: Further navigation can be implemented here (e.g., settings, help).");
    });

    settingsBtn.addEventListener('click', () => {
        console.log("Settings button clicked - Implement settings panel");
        alert("Settings: App preferences would go here.");
    });

    addItemBtn.addEventListener('click', () => {
        const item = prompt("Enter item to check (e.g., a URL, file name, app name):");
        if (item && item.trim() !== "") {
            currentItemToCheck = item.trim();
            statusDisplay.textContent = `Ready to check: ${currentItemToCheck}`;
            statusDisplay.className = "text-center mb-4 p-3 rounded-md bg-blue-100 text-blue-700"; // Reset style
            lastScanResult = null;
        } else {
            currentItemToCheck = null;
            statusDisplay.textContent = "Status: Neutral";
            statusDisplay.className = "text-center mb-4 p-3 rounded-md bg-slate-200 text-slate-700";
        }
    });

    checkBtn.addEventListener('click', () => {
        if (!currentItemToCheck) {
            alert("Please add an item to check using the '+' button first.");
            return;
        }

        // Simulate a scan (replace with actual scanning logic in a real app)
        console.log(`Checking: ${currentItemToCheck} for links, files, apps, photos, videos, SMS, texts...`);
        const isSafe = Math.random() > 0.4; // 60% chance of being safe for demo
        lastScanResult = isSafe ? 'safe' : 'unsafe';

        const timestamp = new Date().toLocaleString();
        scanHistory.push({ item: currentItemToCheck, result: lastScanResult, date: timestamp });
        updateScanHistoryList();

        if (isSafe) {
            statusDisplay.textContent = `"${currentItemToCheck}" seems SAFE.`;
            statusDisplay.className = "text-center mb-4 p-3 rounded-md bg-green-100 text-green-700";
        } else {
            statusDisplay.textContent = `"${currentItemToCheck}" seems UNSAFE!`;
            statusDisplay.className = "text-center mb-4 p-3 rounded-md bg-red-100 text-red-700";
        }
        // currentItemToCheck = null; // Optional: clear after check or keep for "Keep Safe"
    });

    keepSafeBtn.addEventListener('click', () => {
        if (currentItemToCheck && lastScanResult === 'safe') {
            if (!keptSafeItems.find(item => item.name === currentItemToCheck)) {
                keptSafeItems.push({ name: currentItemToCheck, addedDate: new Date().toLocaleString() });
                updateKeptSafeList();
                alert(`"${currentItemToCheck}" added to Keep Safe list.`);
            } else {
                alert(`"${currentItemToCheck}" is already in the Keep Safe list.`);
            }
        } else if (!currentItemToCheck) {
            alert("No item selected or checked. Please add and check an item first.");
        } else if (lastScanResult === 'unsafe') {
            alert(`"${currentItemToCheck}" was marked unsafe. Cannot add to Keep Safe.`);
        } else {
             alert("Please check an item first to determine if it's safe.");
        }
    });

    historyBtn.addEventListener('click', () => {
        historyContent.classList.toggle('hidden');
        if (!historyContent.classList.contains('hidden')) {
            updateScanHistoryList(); // Refresh list when shown
        }
    });

    // These are more for filtering/display than direct action in this basic version
    safeBtn.addEventListener('click', () => {
        // Could filter a list of items to show only safe ones
        console.log("Safe filter clicked");
        keepSafeContent.classList.toggle('hidden');
         if (!keepSafeContent.classList.contains('hidden')) {
            updateKeptSafeList();
        }
    });

    unsafeBtn.addEventListener('click', () => {
        // Could filter a list of items to show only unsafe ones
        console.log("Unsafe filter clicked");
        alert("Functionality to display/filter unsafe items can be implemented here.");
    });


    function updateKeptSafeList() {
        keptSafeList.innerHTML = ''; // Clear existing list
        if (keptSafeItems.length === 0) {
            keptSafeList.innerHTML = '<li>No items currently kept safe.</li>';
            return;
        }
        keptSafeItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (Added: ${item.addedDate})`;
            keptSafeList.appendChild(li);
        });
    }

    function updateScanHistoryList() {
        scanHistoryList.innerHTML = ''; // Clear existing list
        if (scanHistory.length === 0) {
            scanHistoryList.innerHTML = '<li>No scan history yet.</li>';
            return;
        }
        // Show most recent first
        [...scanHistory].reverse().forEach(scan => {
            const li = document.createElement('li');
            li.textContent = `Item: "${scan.item}", Result: ${scan.result.toUpperCase()}, Date: ${scan.date}`;
            li.classList.add(scan.result === 'safe' ? 'text-green-600' : 'text-red-600');
            scanHistoryList.appendChild(li);
        });
    }

});