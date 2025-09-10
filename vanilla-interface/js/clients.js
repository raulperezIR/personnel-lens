// Mock data for clients
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
let filteredClients = [...mockClients];
let currentPage = 1;
let itemsPerPage = 25;
let sortField = null;
let sortDirection = 'asc';

$(function() {
    // Initialize the page
    initializePage();
    renderClientsTable();
    updatePagination();
    
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
    
    // Search functionality
    let searchTimeout;
    $('#searchInput').on('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterClients();
        }, 300);
    });
    
    // Status filter
    $('#statusFilter').on('change', function() {
        filterClients();
    });
    
    // Items per page
    $('#itemsPerPage').on('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        renderClientsTable();
        updatePagination();
    });
    
    // Table sorting
    const sortHeaders = document.querySelectorAll('#clientsTable th[data-sort]');
    sortHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const field = this.dataset.sort;
            if (sortField === field) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortField = field;
                sortDirection = 'asc';
            }
            sortClients();
            renderClientsTable();
            updateSortIcons();
        });
    });
    
    // Pagination
    $('#prevPage').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderClientsTable();
            updatePagination();
        }
    });
    
    $('#nextPage').on('click', function() {
        const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderClientsTable();
            updatePagination();
        }
    });
    
    // Add client button
    $('#addClientBtn').on('click', function() {
        showToast('Funcionalidad próximamente', 'Esta funcionalidad estará disponible próximamente');
    });
}

function updateSidebarDisplay() {
    const isCollapsed = $('#sidebar').hasClass('collapsed');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    sidebarTexts.forEach(text => {
        text.style.display = isCollapsed ? 'none' : 'block';
    });
}

function filterClients() {
    const searchTerm = $('#searchInput').value.toLowerCase();
    const statusFilter = $('#statusFilter').value;
    
    filteredClients = mockClients.filter(client => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
            client.name.toLowerCase().includes(searchTerm) ||
            client.clientId.toLowerCase().includes(searchTerm) ||
            client.company.toLowerCase().includes(searchTerm) ||
            client.city.toLowerCase().includes(searchTerm);
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    currentPage = 1;
    renderClientsTable();
    updatePagination();
}

function sortClients() {
    filteredClients.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });
}

function updateSortIcons() {
    // Reset all sort icons
    const sortHeaders = document.querySelectorAll('#clientsTable th[data-sort] i');
    sortHeaders.forEach(icon => {
        icon.setAttribute('data-lucide', 'arrow-up-down');
        icon.textContent = createIcon('arrow-up-down');
    });
    
    // Update the active sort icon
    if (sortField) {
        const icon = sortDirection === 'asc' ? 'arrow-up' : 'arrow-down';
        const activeHeader = document.querySelector(`#clientsTable th[data-sort="${sortField}"] i`);
        if (activeHeader) {
            activeHeader.setAttribute('data-lucide', icon);
            activeHeader.textContent = createIcon(icon);
        }
    }
}

function renderClientsTable() {
    const tbody = $('#clientsTableBody');
    tbody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
    const clientsToShow = filteredClients.slice(startIndex, endIndex);
    
    clientsToShow.forEach(client => {
        const row = createClientRow(client);
        tbody.innerHTML += row;
    });
    
    // Replace icons in the new content
    replaceIcons();
}

function createClientRow(client) {
    const statusBadge = getStatusBadge(client.status, client.isActive);
    const formattedDate = formatDate(client.lastContact);
    
    return `
        <tr class="cursor-pointer" onclick="navigateToClientDetail('${client.id}')">
            <td>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-primary-10 rounded-full flex items-center justify-center">
                        <span class="text-primary text-sm font-medium">${client.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                        <div class="font-medium text-foreground">${client.name}</div>
                        <div class="text-sm text-neutral-700">${client.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="font-medium text-foreground">${client.clientId}</div>
            </td>
            <td>
                <div class="text-foreground">${client.company}</div>
            </td>
            <td>
                ${statusBadge}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <i data-lucide="map-pin" class="w-4 h-4 text-neutral-700"></i>
                    <span class="text-foreground">${client.city}</span>
                </div>
            </td>
            <td>
                <div class="text-foreground">${formattedDate}</div>
            </td>
            <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                    <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); editClient('${client.id}')">
                        <i data-lucide="edit" class="w-4 h-4"></i>
                    </button>
                    <button class="btn btn-ghost btn-sm text-danger" onclick="event.stopPropagation(); deleteClient('${client.id}')">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function updatePagination() {
    const totalItems = filteredClients.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    // Update pagination info
    $('#paginationInfo').textContent = `Mostrando ${startItem}-${endItem} de ${totalItems} resultados`;
    
    // Update button states
    $('#prevPage').disabled = currentPage === 1;
    $('#nextPage').disabled = currentPage === totalPages || totalPages === 0;
}

function navigateToClientDetail(clientId) {
    window.location.href = `client-detail.html?id=${clientId}`;
}

function editClient(clientId) {
    showToast('Funcionalidad próximamente', 'La edición de clientes estará disponible próximamente');
}

function deleteClient(clientId) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        showToast('Cliente eliminado', 'El cliente ha sido eliminado correctamente');
    }
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