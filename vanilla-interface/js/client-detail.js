// Mock data for clients (same as in clients.js)
const mockClients = [
    {
        id: "1",
        name: "María González",
        clientId: "CLI-2024-001",
        company: "Tecnología Avanzada S.L.",
        phone: "+34 612 345 678",
        email: "maria.gonzalez@tecavanzada.es",
        address: "Calle Mayor 123, 28001 Madrid",
        city: "Madrid",
        status: "cliente-activo",
        isActive: true,
        lastContact: "2024-01-15",
        notes: "Cliente muy satisfecho con nuestros servicios. Renovación automática activada.",
        contractValue: "€15,000",
        joinDate: "2023-06-15"
    },
    {
        id: "2",
        name: "Carlos Rodríguez",
        clientId: "CLI-2024-002",
        company: "Innovación Digital",
        phone: "+34 687 654 321",
        email: "carlos@innovaciondigital.com",
        address: "Avenida de la Paz 45, 08001 Barcelona",
        city: "Barcelona",
        status: "cliente-prospecto",
        isActive: false,
        lastContact: "2024-01-10",
        notes: "Interesado en ampliar servicios. Pendiente de propuesta comercial.",
        contractValue: "€8,500",
        joinDate: "2024-01-05"
    },
    {
        id: "3",
        name: "Ana Martínez",
        clientId: "CLI-2024-003",
        company: "Consultoría Empresarial",
        phone: "+34 654 987 123",
        email: "ana.martinez@consultoria.es",
        address: "Plaza España 12, 46001 Valencia",
        city: "Valencia",
        status: "cliente-activo",
        isActive: true,
        lastContact: "2024-01-12",
        notes: "Excelente relación comercial. Cliente de alto valor.",
        contractValue: "€22,000",
        joinDate: "2022-03-20"
    },
    {
        id: "4",
        name: "David López",
        clientId: "CLI-2024-004",
        company: "Desarrollo Web Pro",
        phone: "+34 611 222 333",
        email: "david@webpro.es",
        address: "Calle Colón 67, 41001 Sevilla",
        city: "Sevilla",
        status: "cliente-inactivo",
        isActive: false,
        lastContact: "2023-11-20",
        notes: "Contrato pausado temporalmente. Reactivación programada para Q2.",
        contractValue: "€12,000",
        joinDate: "2023-01-10"
    },
    {
        id: "5",
        name: "Laura Fernández",
        clientId: "CLI-2024-005",
        company: "Marketing Solutions",
        phone: "+34 698 777 888",
        email: "laura@marketingsol.com",
        address: "Gran Vía 89, 48001 Bilbao",
        city: "Bilbao",
        status: "cliente-activo",
        isActive: true,
        lastContact: "2024-01-14",
        notes: "Cliente estratégico con múltiples proyectos activos.",
        contractValue: "€18,500",
        joinDate: "2023-09-15"
    }
];

// Global variables
let currentClient = null;
let originalClientData = null;
let isEditing = false;

$(function() {
    // Initialize the page
    initializePage();
    loadClientData();
    
    // Event listeners
    setupEventListeners();
});

function initializePage() {
    // Show/hide sidebar text based on collapsed state
    updateSidebarDisplay();
}

function setupEventListeners() {
    // Sidebar toggle
    $('#sidebarToggle').on('click', function() {
        $('#sidebar').toggleClass('collapsed');
        updateSidebarDisplay();
    });
    
    // Logout
    $('#logoutBtn').on('click', function() {
        showToast('Sesión cerrada', 'Has cerrado sesión correctamente');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
    
    // Tab navigation
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Edit mode
    $('#editBtn').on('click', function() {
        enterEditMode();
    });
    
    $('#cancelBtn').on('click', function() {
        exitEditMode();
        restoreOriginalData();
    });
    
    $('#saveBtn').on('click', function() {
        saveClientData();
    });
}

function updateSidebarDisplay() {
    const isCollapsed = $('#sidebar').hasClass('collapsed');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    sidebarTexts.forEach(text => {
        text.style.display = isCollapsed ? 'none' : 'block';
    });
}

function loadClientData() {
    // Get client ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');
    
    if (!clientId) {
        showClientNotFound();
        return;
    }
    
    // Find client in mock data
    currentClient = mockClients.find(client => client.id === clientId);
    
    if (!currentClient) {
        showClientNotFound();
        return;
    }
    
    // Store original data for cancel functionality
    originalClientData = { ...currentClient };
    
    // Populate the form with client data
    populateClientForm(currentClient);
}

function showClientNotFound() {
    $('#clientName').textContent = 'Cliente no encontrado';
    $('#clientNameBreadcrumb').textContent = 'Cliente no encontrado';
    showToast('Error', 'No se pudo encontrar el cliente especificado');
    
    // Hide edit buttons
    $('#editButtons').hide();
    $('#saveButtons').hide();
}

function populateClientForm(client) {
    // Header information
    $('#clientName').textContent = client.name;
    $('#clientCompany').textContent = client.company;
    $('#clientId').textContent = client.clientId;
    $('#clientNameBreadcrumb').textContent = client.name;
    $('#clientInitials').textContent = getInitials(client.name);
    
    // Status badge
    $('#clientStatusBadge').innerHTML = getStatusBadge(client.status, client.isActive);
    
    // General tab
    $('#name').value = client.name;
    $('#email').value = client.email;
    $('#company').value = client.company;
    $('#contractValue').value = client.contractValue;
    $('#joinDate').value = client.joinDate;
    $('#status').value = client.status;
    $('#notes').value = client.notes;
    
    // Contact tab
    $('#phone').value = client.phone;
    $('#contactEmail').value = client.email;
    $('#address').value = client.address;
    $('#city').value = client.city;
    $('#lastContact').value = client.lastContact;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusBadge(status, isActive) {
    if (!isActive && status === 'cliente-prospecto') {
        return '<span class="badge badge-warning">Cliente Prospecto</span>';
    }
    if (isActive && status === 'cliente-activo') {
        return '<span class="badge badge-success">Cliente Activo</span>';
    }
    if (!isActive && status === 'cliente-inactivo') {
        return '<span class="badge badge-danger">Cliente Inactivo</span>';
    }
    return '';
}

function switchTab(tabId) {
    // Update tab triggers
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    tabTriggers.forEach(trigger => {
        trigger.classList.remove('active');
        if (trigger.dataset.tab === tabId) {
            trigger.classList.add('active');
        }
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.tab === tabId) {
            content.classList.add('active');
        }
    });
}

function enterEditMode() {
    isEditing = true;
    
    // Show/hide buttons
    $('#editButtons').hide();
    $('#saveButtons').show();
    
    // Enable form fields
    const inputs = document.querySelectorAll('input:not([type="date"][id="joinDate"]), select, textarea');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
        input.classList.add('border-primary');
    });
    
    showToast('Modo edición', 'Ahora puedes editar la información del cliente');
}

function exitEditMode() {
    isEditing = false;
    
    // Show/hide buttons
    $('#editButtons').show();
    $('#saveButtons').hide();
    
    // Disable form fields
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.setAttribute('readonly', 'true');
        input.setAttribute('disabled', 'true');
        input.classList.remove('border-primary');
    });
}

function restoreOriginalData() {
    if (originalClientData) {
        populateClientForm(originalClientData);
        currentClient = { ...originalClientData };
    }
}

function saveClientData() {
    // Collect form data
    const updatedClient = {
        ...currentClient,
        name: $('#name').value,
        email: $('#email').value,
        company: $('#company').value,
        contractValue: $('#contractValue').value,
        status: $('#status').value,
        notes: $('#notes').value,
        phone: $('#phone').value,
        address: $('#address').value,
        city: $('#city').value,
        lastContact: $('#lastContact').value
    };
    
    // Update current client data
    currentClient = updatedClient;
    
    // Update the display with new data
    populateClientForm(currentClient);
    
    // Exit edit mode
    exitEditMode();
    
    // Show success message
    showToast('Cliente actualizado', 'Los datos del cliente se han guardado correctamente');
    
    // In a real application, you would send this data to a server
    console.log('Client data updated:', updatedClient);
}

function showToast(title, description) {
    $('#toast-title').textContent = title;
    $('#toast-description').textContent = description;
    $('#toast').fadeIn(300);
    
    // Auto hide after 3 seconds
    setTimeout(function() {
        $('#toast').fadeOut(300);
    }, 3000);
}