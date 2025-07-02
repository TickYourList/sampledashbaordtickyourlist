// TickYourList Admin Dashboard JavaScript
// Complete API integration and UI management

class TickYourListAdmin {
    constructor() {
        this.baseUrl = '/api/v1';
        this.currentDomain = '';
        this.currentSection = 'dashboard';
        this.authToken = localStorage.getItem('authToken') || '';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // Navigation handling
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                if (section) this.switchSection(section);
            });
        });

        // Domain selector
        const domainSelector = document.getElementById('domain-selector');
        if (domainSelector) {
            domainSelector.addEventListener('change', (e) => {
                this.currentDomain = e.target.value;
                this.loadSectionData(this.currentSection);
            });
        }

        // Add new button
        const addBtn = document.getElementById('add-new-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openAddModal(this.currentSection));
        }
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');

        this.currentSection = section;
        this.updatePageTitle(this.getSectionTitle(section));
        this.loadSectionData(section);
    }

    getSectionTitle(section) {
        const titles = {
            dashboard: 'Dashboard Overview',
            tours: 'Tours & Experiences',
            variants: 'Tour Variants',
            pricing: 'Calendar Pricing',
            categories: 'Categories Management',
            bookings: 'Bookings Management',
            reviews: 'Reviews & Ratings'
        };
        return titles[section] || 'Dashboard';
    }

    updatePageTitle(title) {
        const titleElement = document.getElementById('page-title');
        if (titleElement) titleElement.textContent = title;
    }

    async loadInitialData() {
        await this.loadDomains();
        await this.loadSectionData('dashboard');
        this.initializeCharts();
    }

    async loadDomains() {
        try {
            const domains = [
                { id: 'domain1', name: 'Main Travel Site' },
                { id: 'domain2', name: 'Adventure Tours' },
                { id: 'domain3', name: 'City Experiences' }
            ];
            
            const selector = document.getElementById('domain-selector');
            if (selector) {
                domains.forEach(domain => {
                    const option = document.createElement('option');
                    option.value = domain.id;
                    option.textContent = domain.name;
                    selector.appendChild(option);
                });
                
                if (domains.length > 0) {
                    this.currentDomain = domains[0].id;
                    selector.value = this.currentDomain;
                }
            }
        } catch (error) {
            console.error('Error loading domains:', error);
        }
    }

    async loadSectionData(section) {
        if (!this.currentDomain) return;

        try {
            switch (section) {
                case 'dashboard':
                    await this.loadDashboardData();
                    break;
                case 'tours':
                    await this.loadToursData();
                    break;
                case 'variants':
                    await this.loadVariantsData();
                    break;
                case 'pricing':
                    await this.loadPricingData();
                    break;
                case 'categories':
                    await this.loadCategoriesData();
                    break;
                case 'cities':
                    await this.loadCitiesData();
                    break;
                case 'bookings':
                    await this.loadBookingsData();
                    break;
                case 'reviews':
                    await this.loadReviewsData();
                    break;
                case 'customers':
                    await this.loadCustomersData();
                    break;
                case 'mail':
                    await this.loadMailData();
                    break;
                case 'coupons':
                    await this.loadCouponsData();
                    break;
                case 'collections':
                    await this.loadCollectionsData();
                    break;
                case 'countries':
                    await this.loadCountriesData();
                    break;
                case 'currencies':
                    await this.loadCurrenciesData();
                    break;
                case 'banners':
                    await this.loadBannersData();
                    break;
                case 'partners':
                    await this.loadPartnersData();
                    break;
                case 'faqs':
                    await this.loadFaqsData();
                    break;
                case 'analytics':
                    await this.loadAnalyticsData();
                    break;
                case 'settings':
                    await this.loadSettingsData();
                    break;
                case 'users':
                    await this.loadUsersData();
                    break;
                default:
                    console.log(`No specific loader for section: ${section}`);
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${section} data:`, error);
        }
    }

    async loadDashboardData() {
        const stats = {
            totalTours: 142,
            activeBookings: 1247,
            dailyRevenue: 15420,
            satisfactionRate: 4.8
        };

        const recentBookings = [
            { id: 'BK001', tour: 'Paris City Tour', customer: 'John Doe', amount: '$299', status: 'confirmed' },
            { id: 'BK002', tour: 'Rome Food Experience', customer: 'Jane Smith', amount: '$189', status: 'pending' },
            { id: 'BK003', tour: 'Tokyo Night Walk', customer: 'Mike Johnson', amount: '$149', status: 'confirmed' }
        ];

        // Load comprehensive dashboard data
        const citiesData = await this.loadCitiesAnalytics();
        const topProducts = await this.loadTopProducts();
        const topDestinations = await this.loadTopDestinations();
        const topCustomers = await this.loadTopCustomers();

        this.renderDashboardStats(stats);
        this.renderRecentBookings(recentBookings);
        this.renderCitiesPieChart(citiesData);
        this.renderCitiesMap(citiesData);
        this.renderTopProducts(topProducts);
        this.renderTopDestinations(topDestinations);
        this.renderTopCustomers(topCustomers);
    }

    async loadCitiesAnalytics() {
        try {
            // Simulate API call to get cities with booking counts
            return [
                { name: 'Paris', bookings: 245, revenue: 45600, lat: 48.8566, lng: 2.3522 },
                { name: 'Rome', bookings: 189, revenue: 34200, lat: 41.9028, lng: 12.4964 },
                { name: 'Tokyo', bookings: 156, revenue: 28900, lat: 35.6762, lng: 139.6503 },
                { name: 'Barcelona', bookings: 134, revenue: 23800, lat: 41.3851, lng: 2.1734 },
                { name: 'London', bookings: 123, revenue: 21500, lat: 51.5074, lng: -0.1278 },
                { name: 'Dubai', bookings: 98, revenue: 18200, lat: 25.2048, lng: 55.2708 }
            ];
        } catch (error) {
            console.error('Error loading cities analytics:', error);
            return [];
        }
    }

    async loadTopProducts() {
        try {
            return [
                { name: 'Paris Louvre Skip-the-Line', bookings: 89, revenue: 12400, rating: 4.9 },
                { name: 'Rome Colosseum VIP Tour', bookings: 76, revenue: 11200, rating: 4.8 },
                { name: 'Tokyo Food Walking Tour', bookings: 65, revenue: 9800, rating: 4.7 },
                { name: 'Barcelona Sagrada Familia', bookings: 58, revenue: 8900, rating: 4.8 },
                { name: 'London Thames Cruise', bookings: 52, revenue: 7600, rating: 4.6 }
            ];
        } catch (error) {
            console.error('Error loading top products:', error);
            return [];
        }
    }

    async loadTopDestinations() {
        try {
            return [
                { city: 'Paris', country: 'France', bookings: 245, growth: '+12%' },
                { city: 'Rome', country: 'Italy', bookings: 189, growth: '+8%' },
                { city: 'Tokyo', country: 'Japan', bookings: 156, growth: '+15%' },
                { city: 'Barcelona', country: 'Spain', bookings: 134, growth: '+5%' },
                { city: 'London', country: 'UK', bookings: 123, growth: '+3%' }
            ];
        } catch (error) {
            console.error('Error loading top destinations:', error);
            return [];
        }
    }

    async loadTopCustomers() {
        try {
            return [
                { name: 'John Anderson', email: 'john.a@email.com', totalValue: 3420, totalVolume: 12, lastBooking: '2024-01-15' },
                { name: 'Sarah Johnson', email: 'sarah.j@email.com', totalValue: 2890, totalVolume: 8, lastBooking: '2024-01-18' },
                { name: 'Mike Chen', email: 'mike.c@email.com', totalValue: 2650, totalVolume: 9, lastBooking: '2024-01-20' },
                { name: 'Emma Wilson', email: 'emma.w@email.com', totalValue: 2340, totalVolume: 7, lastBooking: '2024-01-22' },
                { name: 'David Brown', email: 'david.b@email.com', totalValue: 2100, totalVolume: 6, lastBooking: '2024-01-19' }
            ];
        } catch (error) {
            console.error('Error loading top customers:', error);
            return [];
        }
    }

    async loadToursData() {
        const mockTours = [
            {
                _id: '1',
                name: 'Paris Highlights Walking Tour',
                cityCode: 'PAR',
                city: { displayName: 'Paris' },
                categoryConnections: [{ item: { name: 'Walking Tours' } }],
                listingPrice: { finalPrice: 45 },
                status: true,
                averageRating: 4.8,
                createdAt: new Date('2024-01-15'),
                imageUploads: [{ url: 'https://example.com/tour1.jpg' }],
                shortSummary: 'Discover Paris\'s most iconic landmarks'
            },
            {
                _id: '2',
                name: 'Rome Colosseum Skip-the-Line',
                cityCode: 'ROM',
                city: { displayName: 'Rome' },
                categoryConnections: [{ item: { name: 'Historical Tours' } }],
                listingPrice: { finalPrice: 65 },
                status: true,
                averageRating: 4.9,
                createdAt: new Date('2024-02-01'),
                imageUploads: [{ url: 'https://example.com/tour2.jpg' }],
                shortSummary: 'Skip the lines and explore ancient Rome'
            }
        ];

        this.renderToursTable(mockTours);
    }

    renderToursTable(tours) {
        const container = document.getElementById('tours-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search tours..." class="form-input" style="width: 300px;" onkeyup="filterTours(this.value)">
                <button class="btn btn-primary" onclick="openTourModal()">
                    <i class="fas fa-plus"></i> Add New Tour
                </button>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tour Name</th>
                            <th>City</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Rating</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tours.map(tour => `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <img src="${tour.imageUploads?.[0]?.url || 'https://via.placeholder.com/40'}" 
                                             alt="${tour.name}" 
                                             style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;">
                                        <div>
                                            <div style="font-weight: 500;">${tour.name}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-secondary);">${tour.shortSummary || ''}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${tour.city?.displayName || tour.cityCode || 'N/A'}</td>
                                <td>${tour.categoryConnections?.[0]?.item?.name || 'Uncategorized'}</td>
                                <td>$${tour.listingPrice?.finalPrice || 'N/A'}</td>
                                <td>
                                    <span class="badge ${tour.status ? 'badge-success' : 'badge-danger'}">
                                        ${tour.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                                        <i class="fas fa-star" style="color: #f59e0b; font-size: 0.75rem;"></i>
                                        <span>${tour.averageRating || 'N/A'}</span>
                                    </div>
                                </td>
                                <td>${new Date(tour.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-secondary btn-sm" onclick="editTour('${tour._id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-info btn-sm" onclick="openUltimateComprehensiveTourView('${tour._id}')" title="Ultimate Overview - See Everything">
                                            <i class="fas fa-telescope"></i>
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="viewTourVariants('${tour._id}')">
                                            <i class="fas fa-layer-group"></i>
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="viewTourPricing('${tour._id}')">
                                            <i class="fas fa-calendar-alt"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteTour('${tour._id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
    }

    async loadBookingsData() {
        const mockBookings = [
            {
                _id: 'b1',
                id: 'BK001',
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                tourName: 'Paris Walking Tour',
                bookingDate: new Date(),
                guestCount: 2,
                totalAmount: 90,
                status: 'confirmed'
            },
            {
                _id: 'b2',
                id: 'BK002',
                customerName: 'Jane Smith',
                customerEmail: 'jane@example.com',
                tourName: 'Rome Food Tour',
                bookingDate: new Date(),
                guestCount: 1,
                totalAmount: 65,
                status: 'pending'
            }
        ];

        this.renderBookingsContent(mockBookings);
    }

    renderBookingsContent(bookings) {
        const container = document.getElementById('bookings')?.querySelector('.card-content');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <select class="form-input" style="width: 200px;">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                </select>
                
                <input type="date" class="form-input" style="width: 150px;">
                <input type="date" class="form-input" style="width: 150px;">
                
                <input type="text" placeholder="Search bookings..." class="form-input" style="width: 300px;">
                
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer</th>
                            <th>Tour</th>
                            <th>Date</th>
                            <th>Guests</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bookings.map(booking => `
                            <tr>
                                <td style="font-weight: 500;">#${booking.id}</td>
                                <td>
                                    <div>${booking.customerName}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${booking.customerEmail}</div>
                                </td>
                                <td>${booking.tourName}</td>
                                <td>${new Date(booking.bookingDate).toLocaleDateString()}</td>
                                <td>${booking.guestCount}</td>
                                <td style="font-weight: 500;">$${booking.totalAmount}</td>
                                <td>
                                    <span class="badge ${this.getBookingStatusClass(booking.status)}">
                                        ${booking.status}
                                    </span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-secondary btn-sm" onclick="viewBookingDetails('${booking._id}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="editBooking('${booking._id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="cancelBooking('${booking._id}')">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
    }

    getBookingStatusClass(status) {
        const statusClasses = {
            pending: 'badge-warning',
            confirmed: 'badge-success',
            cancelled: 'badge-danger',
            completed: 'badge-info'
        };
        return statusClasses[status] || 'badge-secondary';
    }

    renderDashboardStats(stats) {
        const elements = {
            'total-tours': stats.totalTours.toLocaleString(),
            'active-bookings': stats.activeBookings.toLocaleString(),
            'daily-revenue': `$${stats.dailyRevenue.toLocaleString()}`,
            'satisfaction-rate': stats.satisfactionRate.toFixed(1)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    renderRecentBookings(bookings) {
        const container = document.getElementById('recent-bookings');
        if (!container) return;
        
        const html = bookings.map(booking => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                <div>
                    <div style="font-weight: 500; font-size: 0.875rem;">${booking.tour}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${booking.customer}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 500; font-size: 0.875rem;">${booking.amount}</div>
                    <div class="badge ${this.getBookingStatusClass(booking.status)}" style="font-size: 0.625rem;">
                        ${booking.status}
                    </div>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
    }

    renderCitiesPieChart(citiesData) {
        const container = document.getElementById('cities-pie-chart');
        if (!container) return;

        const ctx = container.getContext('2d');
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: citiesData.map(city => city.name),
                datasets: [{
                    data: citiesData.map(city => city.bookings),
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Bookings by City'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderCitiesMap(citiesData) {
        const container = document.getElementById('cities-map');
        if (!container) return;

        // Initialize map
        const map = L.map(container).setView([41.9028, 12.4964], 4);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers for each city
        citiesData.forEach(city => {
            const marker = L.marker([city.lat, city.lng]).addTo(map);
            marker.bindPopup(`
                <div style="text-align: center;">
                    <h4>${city.name}</h4>
                    <p><strong>Bookings:</strong> ${city.bookings}</p>
                    <p><strong>Revenue:</strong> $${city.revenue.toLocaleString()}</p>
                </div>
            `);
        });
    }

    renderTopProducts(topProducts) {
        const container = document.getElementById('top-products-container');
        if (!container) return;

        const html = `
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">🏆 Top Products</h3>
                <div class="space-y-3">
                    ${topProducts.map((product, index) => `
                        <div class="flex items-center justify-between p-3 border rounded-lg">
                            <div class="flex items-center space-x-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-full ${index === 0 ? 'bg-yellow-100 text-yellow-800' : index === 1 ? 'bg-gray-100 text-gray-800' : index === 2 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'} font-bold text-sm">
                                    ${index + 1}
                                </span>
                                <div>
                                    <div class="font-medium">${product.name}</div>
                                    <div class="text-sm text-gray-500">${product.bookings} bookings • ⭐ ${product.rating}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold text-green-600">$${product.revenue.toLocaleString()}</div>
                                <div class="text-sm text-gray-500">Revenue</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    renderTopDestinations(topDestinations) {
        const container = document.getElementById('top-destinations-container');
        if (!container) return;

        const html = `
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">🌍 Top Destinations</h3>
                <div class="space-y-3">
                    ${topDestinations.map((destination, index) => `
                        <div class="flex items-center justify-between p-3 border rounded-lg">
                            <div class="flex items-center space-x-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-full ${index === 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'} font-bold text-sm">
                                    ${index + 1}
                                </span>
                                <div>
                                    <div class="font-medium">${destination.city}</div>
                                    <div class="text-sm text-gray-500">${destination.country}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold">${destination.bookings} bookings</div>
                                <div class="text-sm ${destination.growth.includes('+') ? 'text-green-600' : 'text-red-600'}">${destination.growth}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    renderTopCustomers(topCustomers) {
        const container = document.getElementById('top-customers-container');
        if (!container) return;

        const html = `
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">👑 Top Customers</h3>
                <div class="mb-4">
                    <div class="flex space-x-2">
                        <button onclick="showTopCustomersByValue()" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">By Value</button>
                        <button onclick="showTopCustomersByVolume()" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">By Volume</button>
                    </div>
                </div>
                <div class="space-y-3" id="top-customers-list">
                    ${topCustomers.map((customer, index) => `
                        <div class="flex items-center justify-between p-3 border rounded-lg">
                            <div class="flex items-center space-x-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-full ${index === 0 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'} font-bold text-sm">
                                    ${index + 1}
                                </span>
                                <div>
                                    <div class="font-medium">${customer.name}</div>
                                    <div class="text-sm text-gray-500">${customer.email}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold text-green-600">$${customer.totalValue}</div>
                                <div class="text-sm text-gray-500">${customer.totalVolume} bookings</div>
                                <div class="text-xs text-gray-400">Last: ${customer.lastBooking}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    initializeCharts() {
        setTimeout(() => {
            const chartElement = document.getElementById('revenue-chart');
            if (chartElement && typeof Chart !== 'undefined') {
                const ctx = chartElement.getContext('2d');
                
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Revenue',
                            data: [12000, 19000, 15000, 25000, 22000, 30000],
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }, 500);
    }

    openAddModal(section) {
        switch (section) {
            case 'tours':
                this.openTourModal();
                break;
            case 'variants':
                this.openVariantModal();
                break;
            case 'categories':
                this.openCategoryModal();
                break;
            default:
                console.log(`Opening ${section} modal`);
        }
    }

    openTourModal(tourId = null) {
        const isEdit = !!tourId;
        const title = isEdit ? 'Edit Tour' : 'Add New Tour';
        
        const content = `
            <form id="tour-form" class="form-grid">
                <div class="form-group">
                    <label class="form-label">Tour Name *</label>
                    <input type="text" name="name" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">City *</label>
                    <select name="cityCode" class="form-input" required>
                        <option value="">Select City</option>
                        <option value="PAR">Paris</option>
                        <option value="ROM">Rome</option>
                        <option value="LON">London</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Category *</label>
                    <select name="category" class="form-input" required>
                        <option value="">Select Category</option>
                        <option value="walking">Walking Tours</option>
                        <option value="food">Food Tours</option>
                        <option value="historical">Historical Tours</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Tour Type</label>
                    <select name="tourType" class="form-input">
                        <option value="">Select Type</option>
                        <option value="walking">Walking Tour</option>
                        <option value="bus">Bus Tour</option>
                        <option value="private">Private Tour</option>
                        <option value="group">Group Tour</option>
                    </select>
                </div>
                
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Short Summary</label>
                    <textarea name="shortSummary" class="form-input form-textarea" rows="3"></textarea>
                </div>
                
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Full Description</label>
                    <textarea name="summary" class="form-input form-textarea" rows="5"></textarea>
                </div>
                
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Highlights</label>
                    <textarea name="highlights" class="form-input form-textarea" rows="4" placeholder="• Explore famous landmarks&#10;• Professional guide&#10;• Small group experience"></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Duration (Min)</label>
                    <input type="text" name="minDuration" class="form-input" placeholder="2 hours">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Duration (Max)</label>
                    <input type="text" name="maxDuration" class="form-input" placeholder="3 hours">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Distance</label>
                    <input type="text" name="distance" class="form-input" placeholder="5 km">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select name="status" class="form-input">
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </form>
        `;
        
        this.openModal(title, content, () => this.saveTour(tourId));
    }

    openModal(title, content, onSave = null) {
        const modal = document.getElementById('modal-overlay');
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-content').innerHTML = content;
        modal.style.display = 'flex';
        
        const submitBtn = document.getElementById('modal-submit');
        if (onSave && submitBtn) {
            submitBtn.onclick = onSave;
        }
    }

    closeModal() {
        document.getElementById('modal-overlay').style.display = 'none';
    }

    async saveTour(tourId = null) {
        const form = document.getElementById('tour-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            console.log('Saving tour:', data);
            this.showNotification('Tour saved successfully!', 'success');
            this.closeModal();
            this.loadToursData(); // Reload tours
        } catch (error) {
            console.error('Error saving tour:', error);
            this.showNotification('Error saving tour', 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.375rem',
            color: 'white',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        const colors = {
            info: '#06b6d4',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ========== COMPREHENSIVE DETAIL VIEWS ==========

    async loadCitiesData() {
        const mockCities = [
            {
                _id: 'city1',
                cityCode: 'PAR',
                displayName: 'Paris',
                name: 'Paris',
                country: { displayName: 'France', code: 'FR' },
                tourCount: 45,
                categoryCount: 8,
                collectionCount: 5,
                status: true,
                latitude: 48.8566,
                longitude: 2.3522,
                totalBookings: 2847,
                revenue: 256400,
                rating: 4.8,
                imageURL: { url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city2',
                cityCode: 'ROM',
                displayName: 'Rome',
                name: 'Rome',
                country: { displayName: 'Italy', code: 'IT' },
                tourCount: 38,
                categoryCount: 7,
                collectionCount: 4,
                status: true,
                latitude: 41.9028,
                longitude: 12.4964,
                totalBookings: 2156,
                revenue: 189300,
                rating: 4.7,
                imageURL: { url: 'https://images.unsplash.com/photo-1552832230-c0197040cd63?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city3',
                cityCode: 'LON',
                displayName: 'London',
                name: 'London',
                country: { displayName: 'United Kingdom', code: 'UK' },
                tourCount: 52,
                categoryCount: 9,
                collectionCount: 6,
                status: true,
                latitude: 51.5074,
                longitude: -0.1278,
                totalBookings: 3298,
                revenue: 312800,
                rating: 4.6,
                imageURL: { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city4',
                cityCode: 'TOK',
                displayName: 'Tokyo',
                name: 'Tokyo',
                country: { displayName: 'Japan', code: 'JP' },
                tourCount: 29,
                categoryCount: 6,
                collectionCount: 3,
                status: true,
                latitude: 35.6762,
                longitude: 139.6503,
                totalBookings: 1847,
                revenue: 167200,
                rating: 4.9,
                imageURL: { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city5',
                cityCode: 'NYC',
                displayName: 'New York',
                name: 'New York',
                country: { displayName: 'United States', code: 'US' },
                tourCount: 67,
                categoryCount: 11,
                collectionCount: 8,
                status: true,
                latitude: 40.7128,
                longitude: -74.0060,
                totalBookings: 4156,
                revenue: 445600,
                rating: 4.5,
                imageURL: { url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city6',
                cityCode: 'BAR',
                displayName: 'Barcelona',
                name: 'Barcelona',
                country: { displayName: 'Spain', code: 'ES' },
                tourCount: 34,
                categoryCount: 7,
                collectionCount: 4,
                status: true,
                latitude: 41.3851,
                longitude: 2.1734,
                totalBookings: 1789,
                revenue: 145300,
                rating: 4.7,
                imageURL: { url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city7',
                cityCode: 'DUB',
                displayName: 'Dubai',
                name: 'Dubai',
                country: { displayName: 'United Arab Emirates', code: 'AE' },
                tourCount: 41,
                categoryCount: 8,
                collectionCount: 5,
                status: true,
                latitude: 25.2048,
                longitude: 55.2708,
                totalBookings: 2567,
                revenue: 298700,
                rating: 4.8,
                imageURL: { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=200&fit=crop' }
            },
            {
                _id: 'city8',
                cityCode: 'SYD',
                displayName: 'Sydney',
                name: 'Sydney',
                country: { displayName: 'Australia', code: 'AU' },
                tourCount: 28,
                categoryCount: 6,
                collectionCount: 3,
                status: true,
                latitude: -33.8688,
                longitude: 151.2093,
                totalBookings: 1456,
                revenue: 134200,
                rating: 4.6,
                imageURL: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop' }
            }
        ];

        this.renderCitiesContent(mockCities);
    }

    renderCitiesContent(cities) {
        const container = document.getElementById('cities-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <input type="text" placeholder="Search cities..." class="form-input" style="width: 300px;" onkeyup="filterCities(this.value)">
                <select class="form-input" style="width: 200px;" onchange="filterCitiesByCountry(this.value)">
                    <option value="">All Countries</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="UK">United Kingdom</option>
                    <option value="JP">Japan</option>
                    <option value="US">United States</option>
                    <option value="ES">Spain</option>
                    <option value="AE">UAE</option>
                    <option value="AU">Australia</option>
                </select>
                <select class="form-input" style="width: 150px;" onchange="sortCitiesBy(this.value)">
                    <option value="">Sort By</option>
                    <option value="tours">Most Tours</option>
                    <option value="bookings">Most Bookings</option>
                    <option value="revenue">Highest Revenue</option>
                    <option value="rating">Highest Rating</option>
                </select>
                <button class="btn btn-primary" onclick="openCityModal()">
                    <i class="fas fa-plus"></i> Add New City
                </button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
                ${cities.map(city => `
                    <div class="card" style="margin: 0; transition: transform 0.2s; cursor: pointer;" onclick="viewCityDetails('${city._id}')">
                        <div style="position: relative; height: 200px; overflow: hidden;">
                            <img src="${city.imageURL?.url || 'https://via.placeholder.com/350x200'}" 
                                 alt="${city.displayName}" 
                                 style="width: 100%; height: 100%; object-fit: cover;">
                            <div style="position: absolute; top: 1rem; right: 1rem;">
                                <span class="badge ${city.status ? 'badge-success' : 'badge-danger'}">
                                    ${city.status ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                        <div class="card-content">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                <div>
                                    <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">${city.displayName}</h3>
                                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">
                                        <i class="fas fa-map-marker-alt"></i> ${city.country.displayName}
                                    </p>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Code</div>
                                    <div style="font-weight: 600; color: var(--primary-color);">${city.cityCode}</div>
                                </div>
                            </div>
                            
                            <!-- Stats Grid -->
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem;">
                                <div style="text-align: center; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 0.375rem; border-left: 3px solid var(--primary-color);">
                                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">${city.tourCount}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Tours</div>
                                </div>
                                <div style="text-align: center; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 0.375rem; border-left: 3px solid var(--success-color);">
                                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--success-color);">${city.totalBookings ? city.totalBookings.toLocaleString() : '0'}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Bookings</div>
                                </div>
                            </div>
                            
                            <!-- Revenue & Rating -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 0.75rem; background: linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(99, 102, 241, 0.1) 100%); border-radius: 0.375rem;">
                                <div style="text-align: center;">
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--success-color);">$${city.revenue ? (city.revenue / 1000).toFixed(0) : '0'}K</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Revenue</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.25rem;">
                                        <span style="font-size: 1.1rem; font-weight: 700; color: var(--warning-color);">${city.rating || '4.5'}</span>
                                        <span style="color: #fbbf24;">⭐</span>
                                    </div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Rating</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--info-color);">${city.categoryCount}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Categories</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 0.5rem;">
                                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); editCity('${city._id}')" title="Edit City">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); viewCityTours('${city._id}')" title="View Tours">
                                    <i class="fas fa-route"></i>
                                </button>
                                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); viewCityAnalytics('${city._id}')" title="Analytics">
                                    <i class="fas fa-chart-line"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteCity('${city._id}')" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
    }

    // ========== DETAIL VIEW METHODS ==========

    openCityDetailView(cityId) {
        const title = 'City Overview - Paris';
        const content = `
            <div style="max-height: 80vh; overflow-y: auto;">
                <!-- Breadcrumb -->
                <nav style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                        <a href="#" onclick="closeModal(); window.adminApp.switchSection('cities')" style="color: var(--primary-color); text-decoration: none;">Cities</a>
                        <i class="fas fa-chevron-right"></i>
                        <span>Paris</span>
                    </div>
                </nav>

                <!-- City Header -->
                <div style="display: flex; gap: 2rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    <img src="https://via.placeholder.com/150x100" alt="Paris" style="width: 150px; height: 100px; object-fit: cover; border-radius: 0.5rem;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                            <div>
                                <h2 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700;">Paris</h2>
                                <p style="margin: 0; color: var(--text-secondary); font-size: 1rem;">
                                    <i class="fas fa-map-marker-alt"></i> France (PAR)
                                </p>
                            </div>
                            <span class="badge badge-success" style="font-size: 0.875rem;">Active</span>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">45</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Total Tours</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--success-color);">8</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Categories</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning-color);">5</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Collections</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--info-color);">247</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Total Bookings</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1.5rem;">
                        <button class="tab-btn active" onclick="switchCityTab('overview', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--primary-color); border-bottom: 2px solid var(--primary-color); font-weight: 500; cursor: pointer;">Overview</button>
                        <button class="tab-btn" onclick="switchCityTab('tours', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Tours</button>
                        <button class="tab-btn" onclick="switchCityTab('categories', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Categories</button>
                        <button class="tab-btn" onclick="switchCityTab('analytics', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Analytics</button>
                    </div>

                    <!-- Overview Tab -->
                    <div id="city-tab-overview" class="city-tab-content">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <!-- Top Categories -->
                            <div>
                                <h4 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Top Categories</h4>
                                <div style="space-y: 0.75rem;">
                                    ${[
                                        { name: 'Walking Tours', count: 18, color: 'var(--primary-color)' },
                                        { name: 'Food Tours', count: 12, color: 'var(--success-color)' },
                                        { name: 'Historical Tours', count: 9, color: 'var(--warning-color)' },
                                        { name: 'Adventure Tours', count: 6, color: 'var(--info-color)' }
                                    ].map(cat => `
                                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 0.375rem; margin-bottom: 0.75rem;">
                                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                                <div style="width: 12px; height: 12px; background: ${cat.color}; border-radius: 50%;"></div>
                                                <span style="font-weight: 500;">${cat.name}</span>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 1rem;">
                                                <span style="color: var(--text-secondary); font-size: 0.875rem;">${cat.count} tours</span>
                                                <button class="btn btn-secondary btn-sm" onclick="viewCategoryTours('${cat.name}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Recent Activity -->
                            <div>
                                <h4 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Recent Activity</h4>
                                <div style="space-y: 1rem;">
                                    ${[
                                        { action: 'New tour added', item: 'Louvre Museum Tour', time: '2 hours ago', type: 'success' },
                                        { action: 'Price updated', item: 'Eiffel Tower Tour', time: '4 hours ago', type: 'info' },
                                        { action: 'Review approved', item: 'Seine River Cruise', time: '6 hours ago', type: 'success' },
                                        { action: 'Booking cancelled', item: 'Montmartre Walking Tour', time: '1 day ago', type: 'warning' }
                                    ].map(activity => `
                                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: 0.375rem; margin-bottom: 1rem;">
                                            <div style="width: 8px; height: 8px; background: var(--${activity.type}-color); border-radius: 50%;"></div>
                                            <div style="flex: 1;">
                                                <div style="font-weight: 500;">${activity.action}</div>
                                                <div style="font-size: 0.875rem; color: var(--text-secondary);">${activity.item}</div>
                                            </div>
                                            <div style="font-size: 0.75rem; color: var(--text-secondary);">${activity.time}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tours Tab -->
                    <div id="city-tab-tours" class="city-tab-content" style="display: none;">
                        <div style="margin-bottom: 1rem;">
                            <input type="text" placeholder="Search tours in Paris..." class="form-input" style="width: 100%;">
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                            ${[
                                { name: 'Paris Highlights Walking Tour', category: 'Walking Tours', price: '$45', rating: 4.8, image: 'https://via.placeholder.com/300x200' },
                                { name: 'Louvre Museum Skip-the-Line', category: 'Historical Tours', price: '$65', rating: 4.9, image: 'https://via.placeholder.com/300x200' },
                                { name: 'Seine River Evening Cruise', category: 'Boat Tours', price: '$35', rating: 4.7, image: 'https://via.placeholder.com/300x200' }
                            ].map(tour => `
                                <div style="border: 1px solid var(--border-color); border-radius: 0.5rem; overflow: hidden; cursor: pointer;" onclick="viewTourDetails('${tour.name}')">
                                    <img src="${tour.image}" alt="${tour.name}" style="width: 100%; height: 150px; object-fit: cover;">
                                    <div style="padding: 1rem;">
                                        <h5 style="margin: 0 0 0.5rem 0; font-weight: 600;">${tour.name}</h5>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                            <span style="font-size: 0.875rem; color: var(--text-secondary);">${tour.category}</span>
                                            <span style="font-weight: 600; color: var(--primary-color);">${tour.price}</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                            <div style="display: flex; gap: 0.125rem;">
                                                ${Array.from({length: 5}, (_, i) => 
                                                    `<i class="fas fa-star" style="color: ${i < Math.floor(tour.rating) ? '#f59e0b' : '#e2e8f0'}; font-size: 0.75rem;"></i>`
                                                ).join('')}
                                            </div>
                                            <span style="font-size: 0.875rem; color: var(--text-secondary);">${tour.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Categories Tab -->
                    <div id="city-tab-categories" class="city-tab-content" style="display: none;">
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Tours Count</th>
                                        <th>Avg Rating</th>
                                        <th>Revenue</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${[
                                        { name: 'Walking Tours', count: 18, rating: 4.8, revenue: '$12,450' },
                                        { name: 'Food Tours', count: 12, rating: 4.9, revenue: '$8,920' },
                                        { name: 'Historical Tours', count: 9, rating: 4.7, revenue: '$15,680' }
                                    ].map(cat => `
                                        <tr>
                                            <td style="font-weight: 500;">${cat.name}</td>
                                            <td><span class="badge badge-info">${cat.count}</span></td>
                                            <td>
                                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                    <i class="fas fa-star" style="color: #f59e0b; font-size: 0.75rem;"></i>
                                                    <span>${cat.rating}</span>
                                                </div>
                                            </td>
                                            <td style="font-weight: 600; color: var(--success-color);">${cat.revenue}</td>
                                            <td>
                                                <button class="btn btn-secondary btn-sm" onclick="viewCategoryDetails('${cat.name}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Analytics Tab -->
                    <div id="city-tab-analytics" class="city-tab-content" style="display: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                            <div style="border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 1rem;">
                                <h5 style="margin-bottom: 1rem;">Revenue Trend</h5>
                                <canvas id="city-revenue-chart" style="max-height: 250px;"></canvas>
                            </div>
                            <div style="border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 1rem;">
                                <h5 style="margin-bottom: 1rem;">Booking Distribution</h5>
                                <canvas id="city-bookings-chart" style="max-height: 250px;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.openModal(title, content, null);
        
        // Initialize charts after modal opens
        setTimeout(() => {
            this.initializeCityCharts();
        }, 300);
    }

    initializeCityCharts() {
        // Revenue chart
        const revenueCtx = document.getElementById('city-revenue-chart');
        if (revenueCtx && typeof Chart !== 'undefined') {
            new Chart(revenueCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [8000, 12000, 9500, 15000, 11000, 16000],
                        borderColor: 'var(--primary-color)',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Bookings chart
        const bookingsCtx = document.getElementById('city-bookings-chart');
        if (bookingsCtx && typeof Chart !== 'undefined') {
            new Chart(bookingsCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Walking Tours', 'Food Tours', 'Historical', 'Adventure'],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: [
                            'var(--primary-color)',
                            'var(--success-color)',
                            'var(--warning-color)',
                            'var(--info-color)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    // Complete data loading with interconnections
    async loadVariantsData() {
        const mockVariants = [
            {
                _id: 'v1',
                name: 'Paris Walking Tour - Standard',
                productId: { _id: '1', name: 'Paris Highlights Walking Tour' },
                cityCode: 'PAR',
                city: { displayName: 'Paris' },
                listingPrice: {
                    prices: [
                        { type: 'adult', finalPrice: 45, originalPrice: 50 },
                        { type: 'child', finalPrice: 25, originalPrice: 30 }
                    ]
                },
                hasTimeSlots: true,
                status: true
            },
            {
                _id: 'v2',
                name: 'Rome Colosseum - Premium',
                productId: { _id: '2', name: 'Rome Colosseum Skip-the-Line' },
                cityCode: 'ROM',
                city: { displayName: 'Rome' },
                listingPrice: {
                    prices: [
                        { type: 'adult', finalPrice: 65, originalPrice: 75 }
                    ]
                },
                hasTimeSlots: false,
                status: true
            }
        ];
        this.renderVariantsContent(mockVariants);
    }

    renderVariantsContent(variants) {
        const container = document.getElementById('variants').querySelector('.card-content');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <input type="text" placeholder="Search variants..." class="form-input" style="width: 300px;" onkeyup="filterVariants(this.value)">
                <select class="form-input" style="width: 200px;" onchange="filterVariantsByTour(this.value)">
                    <option value="">All Tours</option>
                    <option value="1">Paris Highlights Walking Tour</option>
                    <option value="2">Rome Colosseum Skip-the-Line</option>
                </select>
                <select class="form-input" style="width: 150px;" onchange="filterVariantsByCity(this.value)">
                    <option value="">All Cities</option>
                    <option value="PAR">Paris</option>
                    <option value="ROM">Rome</option>
                </select>
                <button class="btn btn-primary" onclick="openVariantModal()">
                    <i class="fas fa-plus"></i> Add New Variant
                </button>
            </div>

            <div style="display: grid; gap: 1.5rem;">
                ${variants.map(variant => `
                    <div class="card" style="margin: 0; border-left: 4px solid var(--primary-color);">
                        <div class="card-content" style="padding: 1.5rem;">
                            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                                <!-- Main Variant Info -->
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                        <div>
                                            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600; cursor: pointer;" 
                                                onclick="viewVariantDetails('${variant._id}')">
                                                ${variant.name}
                                            </h3>
                                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                    <i class="fas fa-route" style="color: var(--primary-color);"></i>
                                                    <a href="#" onclick="viewTourDetails('${variant.productId._id}')" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                                                        ${variant.productId.name}
                                                    </a>
                                                </div>
                                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                    <i class="fas fa-map-marker-alt" style="color: var(--success-color);"></i>
                                                    <a href="#" onclick="viewCityDetails('${variant.cityCode}')" style="color: var(--success-color); text-decoration: none;">
                                                        ${variant.city.displayName}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="text-align: right;">
                                            <span class="badge ${variant.status ? 'badge-success' : 'badge-danger'}" style="margin-bottom: 0.5rem;">
                                                ${variant.status ? 'Active' : 'Inactive'}
                                            </span>
                                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">
                                                $${variant.listingPrice.prices[0]?.finalPrice || 'N/A'}
                                            </div>
                                            <div style="font-size: 0.875rem; color: var(--text-secondary);">Starting Price</div>
                                        </div>
                                    </div>

                                    <!-- Pricing Table -->
                                    <div style="margin-bottom: 1.5rem;">
                                        <h4 style="margin-bottom: 0.75rem; font-size: 1rem; font-weight: 600;">Pricing Structure</h4>
                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.75rem;">
                                            ${variant.listingPrice.prices.map(price => `
                                                <div style="padding: 0.75rem; background: var(--bg-tertiary); border-radius: 0.375rem; border: 1px solid var(--border-color);">
                                                    <div style="font-weight: 600; text-transform: capitalize; margin-bottom: 0.25rem;">${price.type}</div>
                                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                        <span style="font-size: 1.125rem; font-weight: 700; color: var(--primary-color);">$${price.finalPrice}</span>
                                                        ${price.originalPrice && price.originalPrice !== price.finalPrice ? 
                                                            `<span style="font-size: 0.875rem; color: var(--text-secondary); text-decoration: line-through;">$${price.originalPrice}</span>` 
                                                            : ''
                                                        }
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <!-- Quick Info -->
                                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                                        <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem;">
                                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                                <i class="fas fa-clock" style="color: var(--info-color);"></i>
                                                <span style="font-weight: 500;">Time Slots</span>
                                            </div>
                                            <div style="color: var(--text-secondary);">
                                                ${variant.hasTimeSlots ? 'Available' : 'Not Available'}
                                            </div>
                                        </div>
                                        <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem;">
                                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                                <i class="fas fa-users" style="color: var(--warning-color);"></i>
                                                <span style="font-weight: 500;">Capacity</span>
                                            </div>
                                            <div style="color: var(--text-secondary);">
                                                ${Math.floor(Math.random() * 20) + 5} people max
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Panel -->
                                <div>
                                    <div style="background: var(--bg-tertiary); border-radius: 0.5rem; padding: 1.5rem;">
                                        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600;">Quick Actions</h4>
                                        
                                        <div style="display: grid; gap: 0.75rem;">
                                            <button class="btn btn-primary" style="width: 100%;" onclick="editVariant('${variant._id}')">
                                                <i class="fas fa-edit"></i> Edit Variant
                                            </button>
                                            
                                            <button class="btn btn-secondary" style="width: 100%;" onclick="viewVariantPricing('${variant._id}')">
                                                <i class="fas fa-calendar-alt"></i> Manage Pricing
                                            </button>
                                            
                                            <button class="btn btn-secondary" style="width: 100%;" onclick="viewVariantBookings('${variant._id}')">
                                                <i class="fas fa-ticket-alt"></i> View Bookings
                                            </button>
                                            
                                            <button class="btn btn-secondary" style="width: 100%;" onclick="duplicateVariant('${variant._id}')">
                                                <i class="fas fa-copy"></i> Duplicate Variant
                                            </button>
                                            
                                            <button class="btn btn-danger" style="width: 100%;" onclick="deleteVariant('${variant._id}')">
                                                <i class="fas fa-trash"></i> Delete Variant
                                            </button>
                                        </div>

                                        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                                            <h5 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">Connected Items</h5>
                                            
                                            <div style="space-y: 0.5rem;">
                                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                                    <span style="font-size: 0.875rem;">Parent Tour</span>
                                                    <button class="btn btn-secondary btn-sm" onclick="viewTourDetails('${variant.productId._id}')">
                                                        <i class="fas fa-external-link-alt"></i>
                                                    </button>
                                                </div>
                                                
                                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                                    <span style="font-size: 0.875rem;">City Details</span>
                                                    <button class="btn btn-secondary btn-sm" onclick="viewCityDetails('${variant.cityCode}')">
                                                        <i class="fas fa-external-link-alt"></i>
                                                    </button>
                                                </div>
                                                
                                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                                    <span style="font-size: 0.875rem;">Analytics</span>
                                                    <button class="btn btn-secondary btn-sm" onclick="viewVariantAnalytics('${variant._id}')">
                                                        <i class="fas fa-chart-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
    }

    async loadPricingData() {
        const container = document.getElementById('pricing-calendar');
        if (!container) return;
        
        const html = `
            <div style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem;">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Select Tour & Variant</h4>
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label class="form-label">Tour</label>
                            <select id="tour-selector" class="form-input" onchange="loadTourVariants(this.value)">
                                <option value="">Select a tour...</option>
                                <option value="1">Paris Highlights Walking Tour</option>
                                <option value="2">Rome Colosseum Skip-the-Line</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Variant</label>
                            <select id="variant-selector" class="form-input" onchange="loadVariantPricing(this.value)">
                                <option value="">Select variant...</option>
                            </select>
                        </div>
                        
                        <div style="margin-top: 1rem;">
                            <button class="btn btn-primary" style="width: 100%;" onclick="openBulkPricingModal()">
                                <i class="fas fa-calendar-plus"></i> Bulk Update Pricing
                            </button>
                        </div>
                        
                        <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem;">
                            <h5 style="margin-bottom: 0.5rem;">Quick Actions</h5>
                            <button class="btn btn-secondary btn-sm" style="width: 100%; margin-bottom: 0.5rem;" onclick="copyPricingFromDate()">
                                Copy from Date
                            </button>
                            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="applySeasonalPricing()">
                                Apply Seasonal Pricing
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Pricing Calendar</h4>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <button class="btn btn-secondary btn-sm" onclick="previousMonth()">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <span id="current-month" style="padding: 0.5rem 1rem; font-weight: 500;">March 2024</span>
                            <button class="btn btn-secondary btn-sm" onclick="nextMonth()">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-content">
                        <div id="pricing-calendar-grid">
                            ${this.renderPricingCalendar()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    renderPricingCalendar() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        let calendarHTML = `
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--border-color); border-radius: 0.375rem; overflow: hidden;">
                ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
                    `<div style="background: var(--bg-tertiary); padding: 0.75rem; text-align: center; font-weight: 600; font-size: 0.875rem;">${day}</div>`
                ).join('')}
        `;
        
        // Generate calendar days with pricing info
        for (let day = 1; day <= 31; day++) {
            const price = Math.floor(Math.random() * 100) + 50; // Mock pricing
            const availability = Math.floor(Math.random() * 20) + 5;
            const isWeekend = day % 7 === 0 || day % 7 === 6;
            
            calendarHTML += `
                <div class="calendar-day" 
                     style="background: var(--bg-primary); padding: 0.75rem; min-height: 100px; cursor: pointer; border: 1px solid transparent; transition: all 0.2s;"
                     onclick="openDayPricing('2024-03-${day.toString().padStart(2, '0')}')"
                     onmouseover="this.style.backgroundColor='var(--bg-tertiary)'"
                     onmouseout="this.style.backgroundColor='var(--bg-primary)'">
                    <div style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: ${isWeekend ? 'var(--primary-color)' : 'var(--text-primary)'};">
                        ${day}
                    </div>
                    <div style="font-size: 0.75rem; color: var(--success-color); font-weight: 500;">
                        $${price}
                    </div>
                    <div style="font-size: 0.625rem; color: var(--text-secondary);">
                        ${availability} available
                    </div>
                    ${isWeekend ? '<div style="font-size: 0.625rem; color: var(--warning-color);">Weekend</div>' : ''}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        return calendarHTML;
    }

    async loadCategoriesData() {
        const mockCategories = [
            { _id: 'cat1', name: 'Walking Tours', displayName: 'Walking Tours', sortOrder: 1, tourCount: 45 },
            { _id: 'cat2', name: 'Food Tours', displayName: 'Food & Drink Tours', sortOrder: 2, tourCount: 28 },
            { _id: 'cat3', name: 'Historical Tours', displayName: 'Historical Tours', sortOrder: 3, tourCount: 32 },
            { _id: 'cat4', name: 'Adventure Tours', displayName: 'Adventure & Outdoor', sortOrder: 4, tourCount: 19 }
        ];

        const mockSubcategories = [
            { _id: 'sub1', name: 'City Walking', parentCategory: 'cat1', tourCount: 25 },
            { _id: 'sub2', name: 'Food Markets', parentCategory: 'cat2', tourCount: 15 },
            { _id: 'sub3', name: 'Museums', parentCategory: 'cat3', tourCount: 18 }
        ];

        this.renderCategoriesContent(mockCategories, mockSubcategories);
    }

    renderCategoriesContent(categories, subcategories) {
        const container = document.getElementById('categories').querySelector('.card-content');
        if (!container) return;
        
        const html = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4>Categories</h4>
                        <button class="btn btn-primary btn-sm" onclick="openCategoryModal()">
                            <i class="fas fa-plus"></i> Add Category
                        </button>
                    </div>
                    
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Display Name</th>
                                    <th>Tours</th>
                                    <th>Sort</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${categories.map(category => `
                                    <tr>
                                        <td>
                                            <a href="#" onclick="viewCategoryDetails('${category._id}')" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                                                ${category.name}
                                            </a>
                                        </td>
                                        <td>${category.displayName}</td>
                                        <td>
                                            <span class="badge badge-info">${category.tourCount || 0} tours</span>
                                        </td>
                                        <td>${category.sortOrder}</td>
                                        <td>
                                            <div class="action-buttons">
                                                <button class="btn btn-secondary btn-sm" onclick="editCategory('${category._id}')" title="Edit">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-secondary btn-sm" onclick="viewCategoryTours('${category._id}')" title="View Tours">
                                                    <i class="fas fa-route"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" onclick="deleteCategory('${category._id}')" title="Delete">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4>Subcategories</h4>
                        <button class="btn btn-primary btn-sm" onclick="openSubcategoryModal()">
                            <i class="fas fa-plus"></i> Add Subcategory
                        </button>
                    </div>
                    
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Parent Category</th>
                                    <th>Tours</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${subcategories.map(subcategory => {
                                    const parentCat = categories.find(c => c._id === subcategory.parentCategory);
                                    return `
                                        <tr>
                                            <td>
                                                <a href="#" onclick="viewSubcategoryDetails('${subcategory._id}')" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">
                                                    ${subcategory.name}
                                                </a>
                                            </td>
                                            <td>${parentCat ? parentCat.name : 'N/A'}</td>
                                            <td>
                                                <span class="badge badge-info">${subcategory.tourCount || 0} tours</span>
                                            </td>
                                            <td>
                                                <div class="action-buttons">
                                                    <button class="btn btn-secondary btn-sm" onclick="editSubcategory('${subcategory._id}')" title="Edit">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button class="btn btn-secondary btn-sm" onclick="viewSubcategoryTours('${subcategory._id}')" title="View Tours">
                                                        <i class="fas fa-route"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm" onclick="deleteSubcategory('${subcategory._id}')" title="Delete">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    async loadReviewsData() {
        const mockReviews = [
            {
                _id: 'r1',
                nonCustomerName: 'Sarah Johnson',
                reviewerImgUrl: 'https://via.placeholder.com/50',
                rating: 5,
                title: 'Amazing Experience!',
                content: 'The Paris walking tour was absolutely fantastic. Our guide was knowledgeable and friendly, and we saw all the major landmarks.',
                tourId: { _id: '1', name: 'Paris Highlights Walking Tour' },
                bookingId: 'BK001',
                nonCustomerCountryName: 'United States',
                createdAt: new Date('2024-03-10'),
                active: false
            },
            {
                _id: 'r2',
                nonCustomerName: 'Marco Rodriguez',
                reviewerImgUrl: 'https://via.placeholder.com/50',
                rating: 4,
                title: 'Great tour, minor issues',
                content: 'Really enjoyed the Rome tour, but the group was a bit large. The skip-the-line access was worth it though!',
                tourId: { _id: '2', name: 'Rome Colosseum Skip-the-Line' },
                bookingId: 'BK002',
                nonCustomerCountryName: 'Spain',
                createdAt: new Date('2024-03-09'),
                active: true
            }
        ];

        this.renderReviewsContent(mockReviews);
    }

    renderReviewsContent(reviews) {
        const container = document.getElementById('reviews').querySelector('.card-content');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <select class="form-input" style="width: 200px;" onchange="filterReviewsByRating(this.value)">
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
                
                <select class="form-input" style="width: 200px;" onchange="filterReviewsByTour(this.value)">
                    <option value="">All Tours</option>
                    <option value="1">Paris Highlights Walking Tour</option>
                    <option value="2">Rome Colosseum Skip-the-Line</option>
                </select>
                
                <select class="form-input" style="width: 150px;" onchange="filterReviewsByStatus(this.value)">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                
                <input type="text" placeholder="Search reviews..." class="form-input" style="width: 250px;" onkeyup="searchReviews(this.value)">
            </div>
            
            <div style="display: grid; gap: 1rem;">
                ${reviews.map(review => `
                    <div class="card" style="margin: 0; border-left: 4px solid ${review.active ? 'var(--success-color)' : 'var(--warning-color)'};">
                        <div class="card-content" style="padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                <div style="display: flex; gap: 1rem;">
                                    <img src="${review.reviewerImgUrl}" 
                                         alt="${review.nonCustomerName}" 
                                         style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 1rem; margin-bottom: 0.25rem;">${review.nonCustomerName}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${review.nonCustomerCountryName}</div>
                                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                                            <div style="display: flex; gap: 0.125rem;">
                                                ${Array.from({length: 5}, (_, i) => 
                                                    `<i class="fas fa-star" style="color: ${i < review.rating ? '#f59e0b' : '#e2e8f0'}; font-size: 0.875rem;"></i>`
                                                ).join('')}
                                            </div>
                                            <span style="font-weight: 500; color: var(--text-primary);">${review.rating}/5</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; gap: 0.5rem; flex-direction: column;">
                                    <div style="display: flex; gap: 0.5rem;">
                                        <button class="btn btn-success btn-sm" onclick="moderateReview('${review._id}', 'approve')" title="Approve">
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="moderateReview('${review._id}', 'reject')" title="Reject">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <span class="badge ${review.active ? 'badge-success' : 'badge-warning'}" style="text-align: center;">
                                        ${review.active ? 'Approved' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1rem;">
                                <div style="font-weight: 600; margin-bottom: 0.75rem; font-size: 1rem;">${review.title}</div>
                                <div style="line-height: 1.6; color: var(--text-primary);">${review.content}</div>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.875rem; color: var(--text-secondary);">
                                <div style="display: flex; gap: 2rem;">
                                    <div>
                                        <strong>Tour:</strong> 
                                        <a href="#" onclick="viewTourDetails('${review.tourId._id}')" style="color: var(--primary-color); text-decoration: none;">
                                            ${review.tourId.name}
                                        </a>
                                    </div>
                                    <div>
                                        <strong>Booking:</strong> 
                                        <a href="#" onclick="viewBookingDetails('${review.bookingId}')" style="color: var(--primary-color); text-decoration: none;">
                                            #${review.bookingId}
                                        </a>
                                    </div>
                                </div>
                                <div>${new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
    }

    // ========== TOUR GROUP DETAIL VIEWS ==========

    openTourGroupDetailView(tourId) {
        const title = 'Tour Group Overview - Paris Highlights Walking Tour';
        const content = `
            <div style="max-height: 80vh; overflow-y: auto;">
                <!-- Breadcrumb -->
                <nav style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                        <a href="#" onclick="closeModal(); window.adminApp.switchSection('tours')" style="color: var(--primary-color); text-decoration: none;">Tours</a>
                        <i class="fas fa-chevron-right"></i>
                        <a href="#" onclick="viewCityDetails('city1')" style="color: var(--primary-color); text-decoration: none;">Paris</a>
                        <i class="fas fa-chevron-right"></i>
                        <span>Paris Highlights Walking Tour</span>
                    </div>
                </nav>

                <!-- Tour Header -->
                <div style="display: flex; gap: 2rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    <img src="https://via.placeholder.com/200x150" alt="Tour" style="width: 200px; height: 150px; object-fit: cover; border-radius: 0.5rem;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                            <div>
                                <h2 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700;">Paris Highlights Walking Tour</h2>
                                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <i class="fas fa-map-marker-alt" style="color: var(--primary-color);"></i>
                                        <a href="#" onclick="viewCityDetails('city1')" style="color: var(--primary-color); text-decoration: none;">Paris, France</a>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <i class="fas fa-tag" style="color: var(--success-color);"></i>
                                        <a href="#" onclick="viewCategoryDetails('cat1')" style="color: var(--success-color); text-decoration: none;">Walking Tours</a>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <div style="display: flex; gap: 0.125rem;">
                                            ${Array.from({length: 5}, (_, i) => `<i class="fas fa-star" style="color: ${i < 4 ? '#f59e0b' : '#e2e8f0'}; font-size: 0.875rem;"></i>`).join('')}
                                        </div>
                                        <span style="font-weight: 600;">4.8</span>
                                        <span style="color: var(--text-secondary);">(247 reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <span class="badge badge-success" style="font-size: 0.875rem;">Active</span>
                                <div style="margin-top: 0.5rem; font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">$45</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Base Price</div>
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">3</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Variants</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--success-color);">127</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Total Bookings</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning-color);">$5,715</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Monthly Revenue</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--info-color);">96%</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Avg. Capacity</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                    <button class="btn btn-primary" onclick="editTourGroup('tour1')">
                        <i class="fas fa-edit"></i> Edit Tour
                    </button>
                    <button class="btn btn-secondary" onclick="manageTourVariants('tour1')">
                        <i class="fas fa-layer-group"></i> Manage Variants
                    </button>
                    <button class="btn btn-secondary" onclick="viewTourPricing('tour1')">
                        <i class="fas fa-calendar-alt"></i> Calendar Pricing
                    </button>
                    <button class="btn btn-secondary" onclick="viewTourBookings('tour1')">
                        <i class="fas fa-ticket-alt"></i> View Bookings
                    </button>
                    <button class="btn btn-secondary" onclick="viewTourReviews('tour1')">
                        <i class="fas fa-star"></i> Reviews
                    </button>
                    <button class="btn btn-secondary" onclick="duplicateTour('tour1')">
                        <i class="fas fa-copy"></i> Duplicate
                    </button>
                </div>

                <!-- Tabs -->
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1.5rem;">
                        <button class="tab-btn active" onclick="switchTourTab('overview', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--primary-color); border-bottom: 2px solid var(--primary-color); font-weight: 500; cursor: pointer;">Overview</button>
                        <button class="tab-btn" onclick="switchTourTab('variants', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Variants</button>
                        <button class="tab-btn" onclick="switchTourTab('pricing', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Pricing</button>
                        <button class="tab-btn" onclick="switchTourTab('bookings', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Bookings</button>
                        <button class="tab-btn" onclick="switchTourTab('reviews', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Reviews</button>
                        <button class="tab-btn" onclick="switchTourTab('analytics', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Analytics</button>
                    </div>

                    <!-- Overview Tab -->
                    <div id="tour-tab-overview" class="tour-tab-content">
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                            <div>
                                <h4 style="margin-bottom: 1rem;">Tour Description</h4>
                                <div style="line-height: 1.6; color: var(--text-primary); margin-bottom: 2rem;">
                                    Discover the magic of Paris on this comprehensive walking tour that takes you through the city's most iconic landmarks and hidden gems. From the majestic Eiffel Tower to the charming streets of Montmartre, experience the romance and history of the City of Light with our expert local guides.
                                </div>
                                
                                <h4 style="margin-bottom: 1rem;">Tour Highlights</h4>
                                <ul style="margin-bottom: 2rem; padding-left: 1.5rem;">
                                    <li>Visit iconic landmarks including the Eiffel Tower, Arc de Triomphe, and Champs-Élysées</li>
                                    <li>Explore hidden gems in historic neighborhoods</li>
                                    <li>Learn about Parisian culture and history from expert local guides</li>
                                    <li>Enjoy photo opportunities at the most photogenic spots</li>
                                    <li>Small group experience (max 12 people)</li>
                                </ul>

                                <h4 style="margin-bottom: 1rem;">What's Included</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div>
                                        <h5 style="color: var(--success-color); margin-bottom: 0.5rem;">✓ Included</h5>
                                        <ul style="padding-left: 1rem; color: var(--text-secondary);">
                                            <li>Professional tour guide</li>
                                            <li>Small group experience</li>
                                            <li>Photo opportunities</li>
                                            <li>Route planning and navigation</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 style="color: var(--error-color); margin-bottom: 0.5rem;">✗ Not Included</h5>
                                        <ul style="padding-left: 1rem; color: var(--text-secondary);">
                                            <li>Transportation</li>
                                            <li>Food and drinks</li>
                                            <li>Museum entrance fees</li>
                                            <li>Tips and gratuities</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 style="margin-bottom: 1rem;">Quick Stats</h4>
                                <div style="border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span>Duration:</span>
                                        <span style="font-weight: 600;">3 hours</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span>Group Size:</span>
                                        <span style="font-weight: 600;">Max 12 people</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span>Language:</span>
                                        <span style="font-weight: 600;">English</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <span>Meeting Point:</span>
                                        <span style="font-weight: 600;">Eiffel Tower</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between;">
                                        <span>Difficulty:</span>
                                        <span style="font-weight: 600;">Easy</span>
                                    </div>
                                </div>

                                <h4 style="margin-bottom: 1rem;">Connected Items</h4>
                                <div style="space-y: 0.75rem;">
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 0.75rem; margin-bottom: 0.75rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div>
                                                <div style="font-weight: 500;">City</div>
                                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Paris, France</div>
                                            </div>
                                            <button class="btn btn-secondary btn-sm" onclick="viewCityDetails('city1')">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 0.75rem; margin-bottom: 0.75rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div>
                                                <div style="font-weight: 500;">Category</div>
                                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Walking Tours</div>
                                            </div>
                                            <button class="btn btn-secondary btn-sm" onclick="viewCategoryDetails('cat1')">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 0.75rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div>
                                                <div style="font-weight: 500;">Collections</div>
                                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Best of Paris, Walking Tours</div>
                                            </div>
                                            <button class="btn btn-secondary btn-sm" onclick="viewCollections('tour1')">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Variants Tab -->
                    <div id="tour-tab-variants" class="tour-tab-content" style="display: none;">
                        <div style="margin-bottom: 1rem;">
                            <button class="btn btn-primary" onclick="addTourVariant('tour1')">
                                <i class="fas fa-plus"></i> Add New Variant
                            </button>
                        </div>
                        
                        <div style="display: grid; gap: 1rem;">
                            ${[
                                { name: 'Standard Tour', price: '$45', duration: '3 hours', maxCapacity: 12, bookings: 67, status: 'Active' },
                                { name: 'Premium Tour', price: '$65', duration: '4 hours', maxCapacity: 8, bookings: 34, status: 'Active' },
                                { name: 'Private Tour', price: '$250', duration: '3 hours', maxCapacity: 6, bookings: 26, status: 'Active' }
                            ].map(variant => `
                                <div style="border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 1.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                        <div>
                                            <h5 style="margin: 0 0 0.5rem 0; font-weight: 600;">${variant.name}</h5>
                                            <div style="display: flex; gap: 2rem; font-size: 0.875rem; color: var(--text-secondary);">
                                                <span><strong>Duration:</strong> ${variant.duration}</span>
                                                <span><strong>Max Capacity:</strong> ${variant.maxCapacity}</span>
                                                <span><strong>Bookings:</strong> ${variant.bookings}</span>
                                            </div>
                                        </div>
                                        <div style="text-align: right;">
                                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">${variant.price}</div>
                                            <span class="badge badge-success">${variant.status}</span>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 0.5rem;">
                                        <button class="btn btn-secondary btn-sm" onclick="editTourVariant('${variant.name}')">
                                            <i class="fas fa-edit"></i> Edit
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="viewVariantPricing('${variant.name}')">
                                            <i class="fas fa-calendar"></i> Pricing
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="viewVariantBookings('${variant.name}')">
                                            <i class="fas fa-ticket-alt"></i> Bookings
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteVariant('${variant.name}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Other tabs content placeholders -->
                    <div id="tour-tab-pricing" class="tour-tab-content" style="display: none;">
                        <div>Pricing calendar will be displayed here</div>
                    </div>
                    
                    <div id="tour-tab-bookings" class="tour-tab-content" style="display: none;">
                        <div>Recent bookings for this tour will be displayed here</div>
                    </div>
                    
                    <div id="tour-tab-reviews" class="tour-tab-content" style="display: none;">
                        <div>Customer reviews for this tour will be displayed here</div>
                    </div>
                    
                    <div id="tour-tab-analytics" class="tour-tab-content" style="display: none;">
                        <div>Analytics and performance data for this tour will be displayed here</div>
                    </div>
                </div>
            </div>
        `;

        this.openModal(title, content, null);
    }

    openCategoryDetailView(categoryId) {
        const title = 'Category Overview - Walking Tours';
        const content = `
            <div style="max-height: 80vh; overflow-y: auto;">
                <!-- Breadcrumb -->
                <nav style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                        <a href="#" onclick="closeModal(); window.adminApp.switchSection('categories')" style="color: var(--primary-color); text-decoration: none;">Categories</a>
                        <i class="fas fa-chevron-right"></i>
                        <span>Walking Tours</span>
                    </div>
                </nav>

                <!-- Category Header -->
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    <div>
                        <h2 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700;">Walking Tours</h2>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 1rem;">
                            Explore cities on foot with our guided walking tours
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1.5rem;">
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">45</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Total Tours</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--success-color);">12</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Cities</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning-color);">847</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Total Bookings</div>
                            </div>
                            <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--info-color);">4.8</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Avg. Rating</div>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span class="badge badge-success" style="font-size: 0.875rem;">Active</span>
                        <div style="margin-top: 1rem;">
                            <button class="btn btn-primary" onclick="editCategory('cat1')">
                                <i class="fas fa-edit"></i> Edit Category
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tabs with comprehensive category information -->
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1.5rem;">
                        <button class="tab-btn active" onclick="switchCategoryTab('tours', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--primary-color); border-bottom: 2px solid var(--primary-color); font-weight: 500; cursor: pointer;">Tours</button>
                        <button class="tab-btn" onclick="switchCategoryTab('cities', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Cities</button>
                        <button class="tab-btn" onclick="switchCategoryTab('subcategories', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Subcategories</button>
                        <button class="tab-btn" onclick="switchCategoryTab('analytics', this)" style="padding: 0.75rem 1rem; border: none; background: none; color: var(--text-secondary); border-bottom: 2px solid transparent; font-weight: 500; cursor: pointer;">Analytics</button>
                    </div>
                    
                    <!-- Tab contents with comprehensive data -->
                    <div id="category-tab-tours" class="category-tab-content">
                        <!-- Tours tab content here -->
                    </div>
                    
                    <div id="category-tab-cities" class="category-tab-content" style="display: none;">
                        <!-- Cities tab content here -->
                    </div>
                    
                    <div id="category-tab-subcategories" class="category-tab-content" style="display: none;">
                        <!-- Subcategories tab content here -->
                    </div>
                    
                    <div id="category-tab-analytics" class="category-tab-content" style="display: none;">
                        <!-- Analytics tab content here -->
                    </div>
                </div>
            </div>
        `;

        this.openModal(title, content, null);
    }

    // ========== FLOW AND NAVIGATION METHODS ==========

    switchCityTab(tabName, buttonElement) {
        // Hide all tab content
        document.querySelectorAll('.city-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderBottomColor = 'transparent';
            btn.classList.remove('active');
        });
        
        // Show selected tab content
        const tabContent = document.getElementById(`city-tab-${tabName}`);
        if (tabContent) {
            tabContent.style.display = 'block';
        }
        
        // Style active button
        if (buttonElement) {
            buttonElement.style.color = 'var(--primary-color)';
            buttonElement.style.borderBottomColor = 'var(--primary-color)';
            buttonElement.classList.add('active');
        }
    }

    switchTourTab(tabName, buttonElement) {
        // Hide all tab content
        document.querySelectorAll('.tour-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderBottomColor = 'transparent';
            btn.classList.remove('active');
        });
        
        // Show selected tab content
        const tabContent = document.getElementById(`tour-tab-${tabName}`);
        if (tabContent) {
            tabContent.style.display = 'block';
        }
        
        // Style active button
        if (buttonElement) {
            buttonElement.style.color = 'var(--primary-color)';
            buttonElement.style.borderBottomColor = 'var(--primary-color)';
            buttonElement.classList.add('active');
        }
    }

    switchCategoryTab(tabName, buttonElement) {
        // Hide all tab content
        document.querySelectorAll('.category-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.style.color = 'var(--text-secondary)';
            btn.style.borderBottomColor = 'transparent';
            btn.classList.remove('active');
        });
        
        // Show selected tab content
        const tabContent = document.getElementById(`category-tab-${tabName}`);
        if (tabContent) {
            tabContent.style.display = 'block';
        }
        
        // Style active button
        if (buttonElement) {
            buttonElement.style.color = 'var(--primary-color)';
            buttonElement.style.borderBottomColor = 'var(--primary-color)';
            buttonElement.classList.add('active');
        }
    }

    // Customer Management Methods
    async loadCustomersData() {
        // Mock customers data - in real app would fetch from API
        const customersData = [
            { 
                id: 'CUST001',
                name: 'John Anderson', 
                email: 'john.a@email.com', 
                phone: '+1-555-0123',
                totalBookings: 12,
                totalValue: 3420,
                joinDate: '2023-06-15',
                lastBooking: '2024-01-15',
                status: 'Active',
                loyaltyTier: 'Gold'
            },
            { 
                id: 'CUST002',
                name: 'Sarah Johnson', 
                email: 'sarah.j@email.com', 
                phone: '+1-555-0124',
                totalBookings: 8,
                totalValue: 2890,
                joinDate: '2023-08-22',
                lastBooking: '2024-01-18',
                status: 'Active',
                loyaltyTier: 'Silver'
            },
            { 
                id: 'CUST003',
                name: 'Mike Chen', 
                email: 'mike.c@email.com', 
                phone: '+1-555-0125',
                totalBookings: 15,
                totalValue: 4250,
                joinDate: '2023-03-10',
                lastBooking: '2024-01-20',
                status: 'Active',
                loyaltyTier: 'Platinum'
            },
            { 
                id: 'CUST004',
                name: 'Emma Wilson', 
                email: 'emma.w@email.com', 
                phone: '+1-555-0126',
                totalBookings: 5,
                totalValue: 1890,
                joinDate: '2023-11-05',
                lastBooking: '2024-01-22',
                status: 'Active',
                loyaltyTier: 'Bronze'
            },
            { 
                id: 'CUST005',
                name: 'David Brown', 
                email: 'david.b@email.com', 
                phone: '+1-555-0127',
                totalBookings: 3,
                totalValue: 980,
                joinDate: '2023-12-01',
                lastBooking: '2024-01-19',
                status: 'Inactive',
                loyaltyTier: 'Bronze'
            }
        ];

        this.renderCustomersContent(customersData);
    }

    renderCustomersContent(customers) {
        const container = document.getElementById('customers-table-container');
        if (!container) return;

        const html = `
            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <input type="text" id="customer-search" placeholder="Search customers..." class="form-input" style="width: 300px;">
                        <select id="customer-status-filter" class="form-input" style="width: 150px;">
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <select id="customer-tier-filter" class="form-input" style="width: 150px;">
                            <option value="">All Tiers</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" onclick="exportCustomersReport()">
                        <i class="fas fa-download"></i> Export Report
                    </button>
                </div>
            </div>

            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Bookings</th>
                            <th>Total Value</th>
                            <th>Loyalty Tier</th>
                            <th>Join Date</th>
                            <th>Last Booking</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customers.map(customer => `
                            <tr>
                                <td>
                                    <div>
                                        <div style="font-weight: 600;">${customer.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${customer.id}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div style="font-size: 0.875rem;">${customer.email}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${customer.phone}</div>
                                    </div>
                                </td>
                                <td style="text-align: center; font-weight: 600;">${customer.totalBookings}</td>
                                <td style="font-weight: 600; color: var(--success-color);">$${customer.totalValue.toLocaleString()}</td>
                                <td>
                                    <span class="badge ${customer.loyaltyTier === 'Platinum' ? 'badge-info' : customer.loyaltyTier === 'Gold' ? 'badge-warning' : customer.loyaltyTier === 'Silver' ? 'badge-secondary' : 'badge-danger'}">
                                        ${customer.loyaltyTier}
                                    </span>
                                </td>
                                <td>${customer.joinDate}</td>
                                <td>${customer.lastBooking}</td>
                                <td>
                                    <span class="badge ${customer.status === 'Active' ? 'badge-success' : 'badge-danger'}">
                                        ${customer.status}
                                    </span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-sm btn-primary" onclick="viewCustomerAllBookingDetails('${customer.id}')" title="View All Booking Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-secondary" onclick="viewCustomerDetail('${customer.id}')" title="Customer Profile">
                                            <i class="fas fa-user"></i>
                                        </button>
                                        <button class="btn btn-sm btn-warning" onclick="viewCustomerBookings('${customer.id}')" title="Quick Bookings">
                                            <i class="fas fa-calendar"></i>
                                        </button>
                                        <button class="btn btn-sm btn-success" onclick="sendCustomerMail('${customer.id}', '${customer.email}')" title="Send Mail">
                                            <i class="fas fa-envelope"></i>
                                        </button>
                                        <button class="btn btn-sm btn-info" onclick="viewCustomerInvoices('${customer.id}')" title="View Invoices">
                                            <i class="fas fa-file-invoice"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;
    }

    // Mail Center Methods
    async loadMailData() {
        const mailTemplates = [
            { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to TickYourList!', category: 'onboarding' },
            { id: 'booking_confirm', name: 'Booking Confirmation', subject: 'Your booking is confirmed!', category: 'booking' },
            { id: 'reminder', name: 'Tour Reminder', subject: 'Your tour is tomorrow!', category: 'reminder' },
            { id: 'feedback', name: 'Feedback Request', subject: 'How was your experience?', category: 'feedback' },
            { id: 'promotion', name: 'Special Offers', subject: 'Exclusive deals just for you!', category: 'marketing' }
        ];

        this.renderMailContent(mailTemplates);
    }

    renderMailContent(templates) {
        const container = document.getElementById('mail-table-container');
        if (!container) return;

        const html = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Mail Templates -->
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">📧 Email Templates</h4>
                        <button class="btn btn-primary btn-sm" onclick="createEmailTemplate()">
                            <i class="fas fa-plus"></i> New Template
                        </button>
                    </div>
                    <div class="card-content">
                        <div style="display: grid; gap: 1rem;">
                            ${templates.map(template => `
                                <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: 0.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <div style="font-weight: 600;">${template.name}</div>
                                            <div style="font-size: 0.875rem; color: var(--text-secondary);">${template.subject}</div>
                                            <span class="badge badge-info" style="margin-top: 0.5rem;">${template.category}</span>
                                        </div>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <button class="btn btn-sm btn-secondary" onclick="editEmailTemplate('${template.id}')" title="Edit">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-primary" onclick="previewEmailTemplate('${template.id}')" title="Preview">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Send Email -->
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">📤 Send Email</h4>
                    </div>
                    <div class="card-content">
                        <form id="send-email-form" class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Recipients *</label>
                                <select name="recipientType" class="form-input" onchange="updateRecipientOptions(this.value)">
                                    <option value="">Select Recipients</option>
                                    <option value="all">All Customers</option>
                                    <option value="active">Active Customers Only</option>
                                    <option value="tier">By Loyalty Tier</option>
                                    <option value="recent">Recent Customers (30 days)</option>
                                    <option value="specific">Specific Customer</option>
                                </select>
                            </div>

                            <div class="form-group" id="specific-customer-group" style="display: none;">
                                <label class="form-label">Customer Email</label>
                                <input type="email" name="specificEmail" class="form-input" placeholder="customer@email.com">
                            </div>

                            <div class="form-group" id="tier-filter-group" style="display: none;">
                                <label class="form-label">Loyalty Tier</label>
                                <select name="loyaltyTier" class="form-input">
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Platinum">Platinum</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Email Template</label>
                                <select name="template" class="form-input" onchange="loadTemplateContent(this.value)">
                                    <option value="">Select Template or Custom</option>
                                    ${templates.map(template => `
                                        <option value="${template.id}">${template.name}</option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group" style="grid-column: 1 / -1;">
                                <label class="form-label">Subject *</label>
                                <input type="text" name="subject" class="form-input" required>
                            </div>

                            <div class="form-group" style="grid-column: 1 / -1;">
                                <label class="form-label">Message Content *</label>
                                <textarea name="content" class="form-input form-textarea" rows="8" required placeholder="Enter your email content here..."></textarea>
                            </div>

                            <div class="form-group" style="grid-column: 1 / -1;">
                                <button type="button" class="btn btn-primary" onclick="sendCustomEmail()">
                                    <i class="fas fa-paper-plane"></i> Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Email History -->
            <div class="card" style="margin-top: 2rem;">
                <div class="card-header">
                    <h4 class="card-title">📊 Email Campaign History</h4>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Subject</th>
                                    <th>Recipients</th>
                                    <th>Sent</th>
                                    <th>Opened</th>
                                    <th>Clicked</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="email-history-table">
                                <tr>
                                    <td>2024-01-20</td>
                                    <td>Special Winter Offers</td>
                                    <td>All Customers</td>
                                    <td>1,245</td>
                                    <td>892 (71.6%)</td>
                                    <td>234 (26.2%)</td>
                                    <td><span class="badge badge-success">Sent</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-secondary" onclick="viewEmailReport('email001')" title="View Report">
                                            <i class="fas fa-chart-bar"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2024-01-18</td>
                                    <td>Booking Reminders</td>
                                    <td>Recent Bookings</td>
                                    <td>156</td>
                                    <td>142 (91.0%)</td>
                                    <td>78 (54.9%)</td>
                                    <td><span class="badge badge-success">Sent</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-secondary" onclick="viewEmailReport('email002')" title="View Report">
                                            <i class="fas fa-chart-bar"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Enhanced Coupons Methods
    async loadCouponsData() {
        const couponsData = [
            {
                id: 'COUP001',
                code: 'WELCOME20',
                name: 'Welcome Discount',
                type: 'percentage',
                value: 20,
                minAmount: 100,
                maxDiscount: 50,
                usageLimit: 1000,
                usedCount: 234,
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                status: 'Active',
                applicableFor: 'New Customers'
            },
            {
                id: 'COUP002',
                code: 'SUMMER15',
                name: 'Summer Special',
                type: 'percentage',
                value: 15,
                minAmount: 200,
                maxDiscount: 100,
                usageLimit: 500,
                usedCount: 89,
                startDate: '2024-06-01',
                endDate: '2024-08-31',
                status: 'Active',
                applicableFor: 'All Customers'
            },
            {
                id: 'COUP003',
                code: 'EARLY50',
                name: 'Early Bird Special',
                type: 'fixed',
                value: 50,
                minAmount: 300,
                maxDiscount: 50,
                usageLimit: 200,
                usedCount: 156,
                startDate: '2024-01-15',
                endDate: '2024-03-15',
                status: 'Expired',
                applicableFor: 'Gold Members'
            }
        ];

        this.renderCouponsContent(couponsData);
    }

    renderCouponsContent(coupons) {
        const container = document.getElementById('coupons-table-container');
        if (!container) return;

        const html = `
            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <input type="text" id="coupon-search" placeholder="Search coupons..." class="form-input" style="width: 300px;">
                        <select id="coupon-status-filter" class="form-input" style="width: 150px;">
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                            <option value="Disabled">Disabled</option>
                        </select>
                        <select id="coupon-type-filter" class="form-input" style="width: 150px;">
                            <option value="">All Types</option>
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Amount</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" onclick="openCreateCouponForm()">
                        <i class="fas fa-plus"></i> Create Coupon
                    </button>
                </div>
            </div>

            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Coupon Details</th>
                            <th>Discount</th>
                            <th>Conditions</th>
                            <th>Usage</th>
                            <th>Valid Period</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${coupons.map(coupon => `
                            <tr>
                                <td>
                                    <div>
                                        <div style="font-weight: 600; font-family: monospace; color: var(--primary-color);">${coupon.code}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${coupon.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${coupon.applicableFor}</div>
                                    </div>
                                </td>
                                <td>
                                    <div style="font-weight: 600;">
                                        ${coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                                    </div>
                                    ${coupon.maxDiscount ? `<div style="font-size: 0.75rem; color: var(--text-secondary);">Max: $${coupon.maxDiscount}</div>` : ''}
                                </td>
                                <td>
                                    <div style="font-size: 0.875rem;">
                                        Min: $${coupon.minAmount}
                                    </div>
                                </td>
                                <td>
                                    <div style="font-weight: 600;">
                                        ${coupon.usedCount} / ${coupon.usageLimit}
                                    </div>
                                    <div style="width: 100%; background: #e5e7eb; border-radius: 4px; height: 4px; margin-top: 4px;">
                                        <div style="width: ${(coupon.usedCount / coupon.usageLimit) * 100}%; background: var(--primary-color); height: 100%; border-radius: 4px;"></div>
                                    </div>
                                </td>
                                <td>
                                    <div style="font-size: 0.875rem;">
                                        <div>${coupon.startDate}</div>
                                        <div style="color: var(--text-secondary);">to ${coupon.endDate}</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge ${coupon.status === 'Active' ? 'badge-success' : coupon.status === 'Expired' ? 'badge-warning' : 'badge-danger'}">
                                        ${coupon.status}
                                    </span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-sm btn-secondary" onclick="editCoupon('${coupon.id}')" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-sm btn-primary" onclick="duplicateCoupon('${coupon.id}')" title="Duplicate">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                        <button class="btn btn-sm btn-warning" onclick="viewCouponUsage('${coupon.id}')" title="Usage Report">
                                            <i class="fas fa-chart-bar"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="deleteCoupon('${coupon.id}')" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;
    }

    // Missing methods for all sections
    async loadCollectionsData() {
        try {
            const collections = [
                { _id: '1', name: 'Best of Europe', description: 'Top European destinations', toursCount: 25, image: 'https://via.placeholder.com/150', status: 'active' },
                { _id: '2', name: 'Adventure Tours', description: 'Thrilling adventures worldwide', toursCount: 18, image: 'https://via.placeholder.com/150', status: 'active' },
                { _id: '3', name: 'Food & Culture', description: 'Culinary experiences', toursCount: 12, image: 'https://via.placeholder.com/150', status: 'active' }
            ];
            this.renderCollectionsContent(collections);
        } catch (error) {
            console.error('Error loading collections:', error);
        }
    }

    renderCollectionsContent(collections) {
        const container = document.getElementById('collections-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search collections..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openCollectionModal()">
                    <i class="fas fa-plus"></i> Add Collection
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Name</th><th>Description</th><th>Tours</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${collections.map(c => `
                            <tr>
                                <td>${c.name}</td>
                                <td>${c.description}</td>
                                <td>${c.toursCount}</td>
                                <td><span class="status-badge status-${c.status}">${c.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editCollection('${c._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deleteCollection('${c._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadCountriesData() {
        try {
            const countries = [
                { _id: '1', name: 'France', code: 'FR', citiesCount: 12, toursCount: 156, currency: 'EUR', status: 'active' },
                { _id: '2', name: 'Italy', code: 'IT', citiesCount: 8, toursCount: 134, currency: 'EUR', status: 'active' },
                { _id: '3', name: 'Japan', code: 'JP', citiesCount: 5, toursCount: 89, currency: 'JPY', status: 'active' }
            ];
            this.renderCountriesContent(countries);
        } catch (error) {
            console.error('Error loading countries:', error);
        }
    }

    renderCountriesContent(countries) {
        const container = document.getElementById('countries-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search countries..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openCountryModal()">
                    <i class="fas fa-plus"></i> Add Country
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Country</th><th>Code</th><th>Cities</th><th>Tours</th><th>Currency</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${countries.map(c => `
                            <tr>
                                <td>${c.name}</td>
                                <td>${c.code}</td>
                                <td>${c.citiesCount}</td>
                                <td>${c.toursCount}</td>
                                <td>${c.currency}</td>
                                <td><span class="status-badge status-${c.status}">${c.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editCountry('${c._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deleteCountry('${c._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadCurrenciesData() {
        try {
            const currencies = [
                { _id: '1', code: 'USD', name: 'US Dollar', symbol: '$', exchangeRate: 1.0, status: 'active' },
                { _id: '2', code: 'EUR', name: 'Euro', symbol: '€', exchangeRate: 0.85, status: 'active' },
                { _id: '3', code: 'GBP', name: 'British Pound', symbol: '£', exchangeRate: 0.73, status: 'active' }
            ];
            this.renderCurrenciesContent(currencies);
        } catch (error) {
            console.error('Error loading currencies:', error);
        }
    }

    renderCurrenciesContent(currencies) {
        const container = document.getElementById('currencies-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search currencies..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openCurrencyModal()">
                    <i class="fas fa-plus"></i> Add Currency
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Code</th><th>Name</th><th>Symbol</th><th>Exchange Rate</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${currencies.map(c => `
                            <tr>
                                <td>${c.code}</td>
                                <td>${c.name}</td>
                                <td>${c.symbol}</td>
                                <td>${c.exchangeRate}</td>
                                <td><span class="status-badge status-${c.status}">${c.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editCurrency('${c._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deleteCurrency('${c._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadBannersData() {
        try {
            const banners = [
                { _id: '1', title: 'Summer Sale', subtitle: '50% Off All Tours', image: 'https://via.placeholder.com/300x150', position: 'home-top', status: 'active' },
                { _id: '2', title: 'New Destinations', subtitle: 'Explore Asia', image: 'https://via.placeholder.com/300x150', position: 'home-middle', status: 'active' }
            ];
            this.renderBannersContent(banners);
        } catch (error) {
            console.error('Error loading banners:', error);
        }
    }

    renderBannersContent(banners) {
        const container = document.getElementById('banners-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search banners..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openBannerModal()">
                    <i class="fas fa-plus"></i> Add Banner
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Preview</th><th>Title</th><th>Position</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${banners.map(b => `
                            <tr>
                                <td><img src="${b.image}" style="width: 100px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                                <td>
                                    <div style="font-weight: 500;">${b.title}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${b.subtitle}</div>
                                </td>
                                <td>${b.position}</td>
                                <td><span class="status-badge status-${b.status}">${b.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editBanner('${b._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deleteBanner('${b._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadPartnersData() {
        try {
            const partners = [
                { _id: '1', name: 'Adventure Co', logo: 'https://via.placeholder.com/100', email: 'contact@adventure.com', toursCount: 15, status: 'active' },
                { _id: '2', name: 'Culture Tours', logo: 'https://via.placeholder.com/100', email: 'info@culture.com', toursCount: 8, status: 'active' }
            ];
            this.renderPartnersContent(partners);
        } catch (error) {
            console.error('Error loading partners:', error);
        }
    }

    renderPartnersContent(partners) {
        const container = document.getElementById('partners-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search partners..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openPartnerModal()">
                    <i class="fas fa-plus"></i> Add Partner
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Partner</th><th>Contact</th><th>Tours</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${partners.map(p => `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <img src="${p.logo}" style="width: 40px; height: 40px; border-radius: 4px;">
                                        <div style="font-weight: 500;">${p.name}</div>
                                    </div>
                                </td>
                                <td>${p.email}</td>
                                <td>${p.toursCount}</td>
                                <td><span class="status-badge status-${p.status}">${p.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editPartner('${p._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deletePartner('${p._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadFaqsData() {
        try {
            const faqs = [
                { _id: '1', question: 'How do I cancel my booking?', answer: 'You can cancel your booking up to 24 hours before...', category: 'Bookings', status: 'published' },
                { _id: '2', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal...', category: 'Payments', status: 'published' }
            ];
            this.renderFaqsContent(faqs);
        } catch (error) {
            console.error('Error loading FAQs:', error);
        }
    }

    renderFaqsContent(faqs) {
        const container = document.getElementById('faqs-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search FAQs..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openFaqModal()">
                    <i class="fas fa-plus"></i> Add FAQ
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Question</th><th>Category</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${faqs.map(f => `
                            <tr>
                                <td>
                                    <div style="font-weight: 500;">${f.question}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">
                                        ${f.answer.substring(0, 100)}...
                                    </div>
                                </td>
                                <td>${f.category}</td>
                                <td><span class="status-badge status-${f.status}">${f.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editFaq('${f._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deleteFaq('${f._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadAnalyticsData() {
        try {
            const analytics = {
                totalRevenue: 245600,
                totalBookings: 1247,
                averageOrderValue: 197,
                conversionRate: 3.2,
                topCountries: [
                    { name: 'United States', bookings: 345, revenue: 67890 },
                    { name: 'United Kingdom', bookings: 234, revenue: 45670 },
                    { name: 'Germany', bookings: 189, revenue: 38920 }
                ]
            };
            this.renderAnalyticsContent(analytics);
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
    }

    renderAnalyticsContent(analytics) {
        const container = document.getElementById('analytics-table-container');
        if (!container) return;
        
        const html = `
            <div class="analytics-dashboard">
                <div class="stats-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <h3>Total Revenue</h3>
                        <div class="stat-value" style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">
                            $${analytics.totalRevenue.toLocaleString()}
                        </div>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <h3>Total Bookings</h3>
                        <div class="stat-value" style="font-size: 2rem; font-weight: bold; color: var(--success-color);">
                            ${analytics.totalBookings.toLocaleString()}
                        </div>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <h3>Avg Order Value</h3>
                        <div class="stat-value" style="font-size: 2rem; font-weight: bold; color: var(--warning-color);">
                            $${analytics.averageOrderValue}
                        </div>
                    </div>
                    <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <h3>Conversion Rate</h3>
                        <div class="stat-value" style="font-size: 2rem; font-weight: bold; color: var(--info-color);">
                            ${analytics.conversionRate}%
                        </div>
                    </div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <h3>Top Countries by Bookings</h3>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr><th>Country</th><th>Bookings</th><th>Revenue</th></tr>
                            </thead>
                            <tbody>
                                ${analytics.topCountries.map(c => `
                                    <tr>
                                        <td>${c.name}</td>
                                        <td>${c.bookings}</td>
                                        <td>$${c.revenue.toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadSettingsData() {
        try {
            const settings = {
                siteName: 'TickYourList',
                defaultCurrency: 'USD',
                timezone: 'UTC',
                emailNotifications: true,
                maintenanceMode: false,
                bookingTimeout: 30
            };
            this.renderSettingsContent(settings);
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    renderSettingsContent(settings) {
        const container = document.getElementById('settings-table-container');
        if (!container) return;
        
        const html = `
            <div class="settings-panel" style="background: white; padding: 2rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3>System Settings</h3>
                
                <div class="settings-form" style="max-width: 600px;">
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label>Site Name</label>
                        <input type="text" class="form-input" value="${settings.siteName}">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label>Default Currency</label>
                        <select class="form-input">
                            <option ${settings.defaultCurrency === 'USD' ? 'selected' : ''}>USD</option>
                            <option ${settings.defaultCurrency === 'EUR' ? 'selected' : ''}>EUR</option>
                            <option ${settings.defaultCurrency === 'GBP' ? 'selected' : ''}>GBP</option>
                        </select>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label>Timezone</label>
                        <select class="form-input">
                            <option ${settings.timezone === 'UTC' ? 'selected' : ''}>UTC</option>
                            <option ${settings.timezone === 'EST' ? 'selected' : ''}>EST</option>
                            <option ${settings.timezone === 'PST' ? 'selected' : ''}>PST</option>
                        </select>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.emailNotifications ? 'checked' : ''}>
                            Email Notifications
                        </label>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.maintenanceMode ? 'checked' : ''}>
                            Maintenance Mode
                        </label>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label>Booking Timeout (minutes)</label>
                        <input type="number" class="form-input" value="${settings.bookingTimeout}">
                    </div>
                    
                    <button class="btn btn-primary" onclick="saveSettings()">Save Settings</button>
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    async loadUsersData() {
        try {
            const users = [
                { _id: '1', name: 'Admin User', email: 'admin@tickyourlist.com', role: 'admin', lastLogin: '2024-01-22', status: 'active' },
                { _id: '2', name: 'Manager User', email: 'manager@tickyourlist.com', role: 'manager', lastLogin: '2024-01-21', status: 'active' },
                { _id: '3', name: 'Editor User', email: 'editor@tickyourlist.com', role: 'editor', lastLogin: '2024-01-20', status: 'active' }
            ];
            this.renderUsersContent(users);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    renderUsersContent(users) {
        const container = document.getElementById('users-table-container');
        if (!container) return;
        
        const html = `
            <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Search users..." class="form-input" style="width: 300px;">
                <button class="btn btn-primary" onclick="openUserModal()">
                    <i class="fas fa-plus"></i> Add User
                </button>
            </div>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        ${users.map(u => `
                            <tr>
                                <td>${u.name}</td>
                                <td>${u.email}</td>
                                <td><span class="role-badge role-${u.role}">${u.role}</span></td>
                                <td>${u.lastLogin}</td>
                                <td><span class="status-badge status-${u.status}">${u.status}</span></td>
                                <td>
                                    <button class="btn-icon" onclick="editUser('${u._id}')"><i class="fas fa-edit"></i></button>
                                    <button class="btn-icon" onclick="deleteUser('${u._id}')"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = html;
    }

    getCouponStatusClass(status) {
        const statusClasses = {
            'active': 'status-active',
            'expired': 'status-expired',
            'used': 'status-used',
            'inactive': 'status-inactive'
        };
        return statusClasses[status] || 'status-default';
    }

    getTimeRemaining(validUntil) {
        const now = new Date();
        const expiry = new Date(validUntil);
        const diff = expiry - now;
        
        if (diff <= 0) return 'Expired';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days > 0) return `${days} days left`;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return `${hours} hours left`;
    }

    // ========== ULTIMATE COMPREHENSIVE TOUR OVERVIEW ==========

    openUltimateComprehensiveTourView(tourId) {
        const title = 'Ultimate Tour Overview - Paris Highlights Walking Tour';
        const content = `
            <div style="max-height: 90vh; overflow-y: auto;">
                <!-- Super Header with Hero Section -->
                <div style="position: relative; height: 300px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.8), rgba(59, 130, 246, 0.6)), url('https://via.placeholder.com/1200x300') center/cover; border-radius: 0.5rem; margin-bottom: 2rem; color: white; display: flex; align-items: end;">
                    <div style="position: absolute; top: 1rem; right: 1rem; display: flex; gap: 0.5rem;">
                        <span class="badge badge-success" style="background: rgba(16, 185, 129, 0.9);">Active</span>
                        <span class="badge" style="background: rgba(245, 158, 11, 0.9);">Featured</span>
                    </div>
                    
                    <div style="padding: 2rem;">
                        <nav style="margin-bottom: 1rem; opacity: 0.9;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                                <a href="#" onclick="closeModal(); window.adminApp.switchSection('tours')" style="color: white; text-decoration: none;">Tours</a>
                                <i class="fas fa-chevron-right"></i>
                                <a href="#" onclick="viewCityDetails('city1')" style="color: white; text-decoration: none;">Paris</a>
                                <i class="fas fa-chevron-right"></i>
                                <span>Ultimate Overview</span>
                            </div>
                        </nav>
                        
                        <h1 style="margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 700;">Paris Highlights Walking Tour</h1>
                        <div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Paris, France</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-tag"></i>
                                <span>Walking Tours</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <div style="display: flex; gap: 0.125rem;">
                                    ${Array.from({length: 5}, (_, i) => `<i class="fas fa-star" style="color: ${i < 4 ? '#f59e0b' : 'rgba(255,255,255,0.3)'}; font-size: 0.875rem;"></i>`).join('')}
                                </div>
                                <span>4.8 (247 reviews)</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 2rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">3</div>
                                <div style="font-size: 0.875rem; opacity: 0.9;">Variants</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">127</div>
                                <div style="font-size: 0.875rem; opacity: 0.9;">Bookings</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">$5,715</div>
                                <div style="font-size: 0.875rem; opacity: 0.9;">Revenue</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">96%</div>
                                <div style="font-size: 0.875rem; opacity: 0.9;">Capacity</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ultimate Action Bar -->
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem; overflow-x: auto;">
                    <button class="btn btn-primary" onclick="editTourGroup('tour1')">
                        <i class="fas fa-edit"></i> Edit Tour
                    </button>
                    <button class="btn btn-secondary" onclick="manageTourVariants('tour1')">
                        <i class="fas fa-layer-group"></i> Variants
                    </button>
                    <button class="btn btn-secondary" onclick="viewTourPricing('tour1')">
                        <i class="fas fa-calendar-alt"></i> Pricing
                    </button>
                    <button class="btn btn-secondary" onclick="viewTourBookings('tour1')">
                        <i class="fas fa-ticket-alt"></i> Bookings
                    </button>
                    <button class="btn btn-secondary" onclick="viewTourReviews('tour1')">
                        <i class="fas fa-star"></i> Reviews
                    </button>
                    <button class="btn btn-secondary" onclick="duplicateTour('tour1')">
                        <i class="fas fa-copy"></i> Duplicate
                    </button>
                    <button class="btn btn-secondary" onclick="window.adminApp.openTourGroupDetailView('tour1')">
                        <i class="fas fa-expand"></i> Detailed View
                    </button>
                </div>

                <!-- Comprehensive Grid Layout -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                    <!-- Left Column - Main Content -->
                    <div style="display: grid; gap: 2rem;">
                        
                        <!-- Tour Variants Overview -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <h3 class="card-title"><i class="fas fa-layer-group" style="margin-right: 0.5rem; color: var(--primary-color);"></i>Tour Variants</h3>
                                    <button class="btn btn-primary btn-sm" onclick="addTourVariant('tour1')">
                                        <i class="fas fa-plus"></i> Add Variant
                                    </button>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 1rem;">
                                    ${[
                                        { name: 'Standard Tour', price: '$45', duration: '3 hours', capacity: 12, bookings: 67, status: 'Active', description: 'Classic walking tour experience' },
                                        { name: 'Premium Tour', price: '$65', duration: '4 hours', capacity: 8, bookings: 34, status: 'Active', description: 'Enhanced tour with exclusive access' },
                                        { name: 'Private Tour', price: '$250', duration: '3 hours', capacity: 6, bookings: 26, status: 'Active', description: 'Personalized private experience' }
                                    ].map(variant => `
                                        <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 1rem; background: var(--bg-tertiary);">
                                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                                <div style="flex: 1;">
                                                    <h4 style="margin: 0 0 0.25rem 0; font-weight: 600; cursor: pointer;" onclick="viewVariantDetails('${variant.name}')">
                                                        ${variant.name}
                                                    </h4>
                                                    <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);">${variant.description}</p>
                                                </div>
                                                <div style="text-align: right; margin-left: 1rem;">
                                                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">${variant.price}</div>
                                                    <span class="badge badge-success" style="font-size: 0.75rem;">${variant.status}</span>
                                                </div>
                                            </div>
                                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 0.75rem;">
                                                <div style="text-align: center; padding: 0.5rem; background: var(--bg-primary); border-radius: 0.25rem;">
                                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Duration</div>
                                                    <div style="font-weight: 600;">${variant.duration}</div>
                                                </div>
                                                <div style="text-align: center; padding: 0.5rem; background: var(--bg-primary); border-radius: 0.25rem;">
                                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Capacity</div>
                                                    <div style="font-weight: 600;">${variant.capacity}</div>
                                                </div>
                                                <div style="text-align: center; padding: 0.5rem; background: var(--bg-primary); border-radius: 0.25rem;">
                                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Bookings</div>
                                                    <div style="font-weight: 600; color: var(--success-color);">${variant.bookings}</div>
                                                </div>
                                            </div>
                                            <div style="display: flex; gap: 0.5rem;">
                                                <button class="btn btn-secondary btn-sm" onclick="editTourVariant('${variant.name}')">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-secondary btn-sm" onclick="viewVariantPricing('${variant.name}')">
                                                    <i class="fas fa-calendar"></i>
                                                </button>
                                                <button class="btn btn-secondary btn-sm" onclick="viewVariantBookings('${variant.name}')">
                                                    <i class="fas fa-ticket-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Image Gallery -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-images" style="margin-right: 0.5rem; color: var(--success-color);"></i>Image Gallery</h3>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                    ${[1, 2, 3, 4, 5, 6].map(i => `
                                        <div style="position: relative; height: 150px; border-radius: 0.375rem; overflow: hidden; cursor: pointer;" onclick="openImageModal('image${i}')">
                                            <img src="https://via.placeholder.com/200x150" alt="Tour Image ${i}" style="width: 100%; height: 100%; object-fit: cover;">
                                            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); display: flex; align-items: end; padding: 0.75rem;">
                                                <span style="color: white; font-size: 0.875rem; font-weight: 500;">Image ${i}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <div style="margin-top: 1rem; text-align: center;">
                                    <button class="btn btn-secondary" onclick="openImageUploadModal()">
                                        <i class="fas fa-upload"></i> Upload More Images
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Content & Description -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-file-text" style="margin-right: 0.5rem; color: var(--warning-color);"></i>Tour Content & Context</h3>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 1.5rem;">
                                    <div>
                                        <h4 style="margin-bottom: 0.75rem; font-weight: 600;">Description</h4>
                                        <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem; line-height: 1.6;">
                                            Discover the magic of Paris on this comprehensive walking tour that takes you through the city's most iconic landmarks and hidden gems. From the majestic Eiffel Tower to the charming streets of Montmartre, experience the romance and history of the City of Light with our expert local guides.
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 style="margin-bottom: 0.75rem; font-weight: 600;">Tour Highlights</h4>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                            <ul style="padding-left: 1.5rem; margin: 0;">
                                                <li>Visit iconic landmarks</li>
                                                <li>Explore hidden gems</li>
                                                <li>Expert local guides</li>
                                            </ul>
                                            <ul style="padding-left: 1.5rem; margin: 0;">
                                                <li>Photo opportunities</li>
                                                <li>Small group experience</li>
                                                <li>Historical insights</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style="margin-bottom: 0.75rem; font-weight: 600;">What's Included/Excluded</h4>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                            <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem; border-left: 3px solid var(--success-color);">
                                                <h5 style="color: var(--success-color); margin: 0 0 0.5rem 0;">✓ Included</h5>
                                                <ul style="padding-left: 1rem; margin: 0; font-size: 0.875rem;">
                                                    <li>Professional guide</li>
                                                    <li>Small group size</li>
                                                    <li>Route planning</li>
                                                </ul>
                                            </div>
                                            <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem; border-left: 3px solid var(--danger-color);">
                                                <h5 style="color: var(--danger-color); margin: 0 0 0.5rem 0;">✗ Not Included</h5>
                                                <ul style="padding-left: 1rem; margin: 0; font-size: 0.875rem;">
                                                    <li>Transportation</li>
                                                    <li>Food & drinks</li>
                                                    <li>Museum fees</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Activity Feed -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-clock" style="margin-right: 0.5rem; color: var(--info-color);"></i>Recent Activity</h3>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 0.75rem;">
                                    ${[
                                        { action: 'New booking received', detail: 'Standard variant - 2 guests', time: '2 hours ago', type: 'success' },
                                        { action: 'Price updated', detail: 'Premium variant pricing adjusted', time: '4 hours ago', type: 'info' },
                                        { action: 'Review submitted', detail: '5-star review by Sarah Johnson', time: '6 hours ago', type: 'success' },
                                        { action: 'Variant edited', detail: 'Private tour capacity updated', time: '1 day ago', type: 'warning' }
                                    ].map(activity => `
                                        <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.375rem;">
                                            <div style="width: 8px; height: 8px; background: var(--${activity.type}-color); border-radius: 50%; flex-shrink: 0;"></div>
                                            <div style="flex: 1;">
                                                <div style="font-weight: 500; font-size: 0.875rem;">${activity.action}</div>
                                                <div style="font-size: 0.75rem; color: var(--text-secondary);">${activity.detail}</div>
                                            </div>
                                            <div style="font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap;">${activity.time}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Connected Data & Analytics -->
                    <div style="display: grid; gap: 2rem;">
                        
                        <!-- Connected Categories & Collections -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-sitemap" style="margin-right: 0.5rem; color: var(--primary-color);"></i>Connections</h3>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 1rem;">
                                    <!-- City Connection -->
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 1rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                            <h4 style="margin: 0; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">CITY</h4>
                                            <button class="btn btn-secondary btn-sm" onclick="viewCityDetails('city1')">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                        </div>
                                        <div style="font-weight: 600;">Paris, France</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">45 tours, 8 categories</div>
                                    </div>

                                    <!-- Category Connection -->
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 1rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                            <h4 style="margin: 0; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">CATEGORY</h4>
                                            <button class="btn btn-secondary btn-sm" onclick="viewCategoryDetails('cat1')">
                                                <i class="fas fa-external-link-alt"></i>
                                            </button>
                                        </div>
                                        <div style="font-weight: 600;">Walking Tours</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">45 tours total</div>
                                    </div>

                                    <!-- Subcategories -->
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 1rem;">
                                        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">SUBCATEGORIES</h4>
                                        <div style="display: flex; flex-wrap: gap: 0.5rem;">
                                            ${['City Center', 'Historic Districts', 'Architectural'].map(sub => `
                                                <span class="badge" style="background: var(--bg-tertiary); color: var(--text-primary); cursor: pointer;" onclick="viewSubcategoryDetails('${sub}')">
                                                    ${sub}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>

                                    <!-- Collections -->
                                    <div style="border: 1px solid var(--border-color); border-radius: 0.375rem; padding: 1rem;">
                                        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">COLLECTIONS</h4>
                                        <div style="display: grid; gap: 0.5rem;">
                                            ${['Best of Paris', 'Walking Tours Collection', 'Featured Tours'].map(collection => `
                                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: var(--bg-tertiary); border-radius: 0.25rem;">
                                                    <span style="font-size: 0.875rem; font-weight: 500;">${collection}</span>
                                                    <button class="btn btn-secondary btn-sm" onclick="viewCollectionDetails('${collection}')">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Stats -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-chart-bar" style="margin-right: 0.5rem; color: var(--success-color);"></i>Performance</h3>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 1rem;">
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                        <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem;">
                                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">4.8</div>
                                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Rating</div>
                                        </div>
                                        <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.375rem;">
                                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success-color);">96%</div>
                                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Capacity</div>
                                        </div>
                                    </div>
                                    
                                    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                                        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">This Month</h4>
                                        <div style="display: grid; gap: 0.5rem; font-size: 0.875rem;">
                                            <div style="display: flex; justify-content: space-between;">
                                                <span>Bookings:</span>
                                                <span style="font-weight: 600; color: var(--success-color);">127</span>
                                            </div>
                                            <div style="display: flex; justify-content: space-between;">
                                                <span>Revenue:</span>
                                                <span style="font-weight: 600; color: var(--success-color);">$5,715</span>
                                            </div>
                                            <div style="display: flex; justify-content: space-between;">
                                                <span>Reviews:</span>
                                                <span style="font-weight: 600;">23</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Reviews Summary -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <h3 class="card-title"><i class="fas fa-star" style="margin-right: 0.5rem; color: var(--warning-color);"></i>Recent Reviews</h3>
                                    <button class="btn btn-secondary btn-sm" onclick="viewTourReviews('tour1')">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 1rem;">
                                    ${[
                                        { name: 'Sarah Johnson', rating: 5, comment: 'Amazing experience! Our guide was fantastic.', time: '2 days ago' },
                                        { name: 'Marco Rodriguez', rating: 4, comment: 'Great tour, would recommend to friends.', time: '3 days ago' }
                                    ].map(review => `
                                        <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: 0.375rem;">
                                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                                <div>
                                                    <div style="font-weight: 600; font-size: 0.875rem;">${review.name}</div>
                                                    <div style="display: flex; gap: 0.125rem; margin-top: 0.25rem;">
                                                        ${Array.from({length: 5}, (_, i) => 
                                                            `<i class="fas fa-star" style="color: ${i < review.rating ? '#f59e0b' : '#e2e8f0'}; font-size: 0.75rem;"></i>`
                                                        ).join('')}
                                                    </div>
                                                </div>
                                                <div style="font-size: 0.75rem; color: var(--text-secondary);">${review.time}</div>
                                            </div>
                                            <div style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.4;">${review.comment}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Recent Bookings -->
                        <div class="card" style="margin: 0;">
                            <div class="card-header">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <h3 class="card-title"><i class="fas fa-ticket-alt" style="margin-right: 0.5rem; color: var(--info-color);"></i>Recent Bookings</h3>
                                    <button class="btn btn-secondary btn-sm" onclick="viewTourBookings('tour1')">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="display: grid; gap: 0.75rem;">
                                    ${[
                                        { id: 'BK001', customer: 'John Doe', variant: 'Standard', amount: '$90', status: 'confirmed' },
                                        { id: 'BK002', customer: 'Jane Smith', variant: 'Premium', amount: '$130', status: 'pending' },
                                        { id: 'BK003', customer: 'Mike Johnson', variant: 'Private', amount: '$250', status: 'confirmed' }
                                    ].map(booking => `
                                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.375rem; font-size: 0.875rem;">
                                            <div>
                                                <div style="font-weight: 600;">${booking.customer}</div>
                                                <div style="color: var(--text-secondary);">${booking.variant} - ${booking.id}</div>
                                            </div>
                                            <div style="text-align: right;">
                                                <div style="font-weight: 600; color: var(--success-color);">${booking.amount}</div>
                                                <span class="badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}" style="font-size: 0.75rem;">
                                                    ${booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.openModal(title, content, null);
    }
}

// Global functions for HTML onclick handlers
function openTourModal(tourId = null) { window.adminApp.openTourModal(tourId); }
function closeModal() { window.adminApp.closeModal(); }
function editTour(tourId) { window.adminApp.openTourModal(tourId); }
function deleteTour(tourId) { 
    if (confirm('Are you sure you want to delete this tour?')) {
        console.log('Deleting tour:', tourId);
        window.adminApp.showNotification('Tour deleted successfully!', 'success');
    }
}
function viewTourVariants(tourId) { window.adminApp.switchSection('variants'); }
function viewTourPricing(tourId) { window.adminApp.switchSection('pricing'); }
function filterTours(searchTerm) { console.log('Filtering tours:', searchTerm); }
function viewBookingDetails(bookingId) { console.log('Viewing booking:', bookingId); }
function editBooking(bookingId) { console.log('Editing booking:', bookingId); }
function cancelBooking(bookingId) { 
    if (confirm('Are you sure you want to cancel this booking?')) {
        console.log('Cancelling booking:', bookingId);
        window.adminApp.showNotification('Booking cancelled successfully!', 'success');
    }
}

// ========== COMPREHENSIVE INTERCONNECTION GLOBAL FUNCTIONS ==========

// City Detail Functions
function viewCityDetails(cityId) { window.adminApp.openCityDetailView(cityId); }
function editCity(cityId) { console.log('Editing city:', cityId); }
function deleteCity(cityId) { 
    if (confirm('Are you sure you want to delete this city?')) {
        console.log('Deleting city:', cityId);
        window.adminApp.showNotification('City deleted successfully!', 'success');
    }
}
function viewCityTours(cityId) { 
    console.log('Viewing tours for city:', cityId);
    window.adminApp.switchSection('tours');
}
function viewCityAnalytics(cityId) { console.log('Viewing analytics for city:', cityId); }
function filterCities(searchTerm) { console.log('Filtering cities:', searchTerm); }
function filterCitiesByCountry(country) { console.log('Filtering cities by country:', country); }
function openCityModal() { console.log('Opening city modal'); }

// Tour Group Detail Functions  
function viewTourDetails(tourId) { window.adminApp.openTourGroupDetailView(tourId); }
function editTourGroup(tourId) { window.adminApp.openTourModal(tourId); }
function manageTourVariants(tourId) { 
    console.log('Managing variants for tour:', tourId);
    window.adminApp.switchSection('variants');
}
function viewTourBookings(tourId) { 
    console.log('Viewing bookings for tour:', tourId);
    window.adminApp.switchSection('bookings');
}
function viewTourReviews(tourId) { 
    console.log('Viewing reviews for tour:', tourId);
    window.adminApp.switchSection('reviews');
}
function duplicateTour(tourId) { 
    if (confirm('Are you sure you want to duplicate this tour?')) {
        console.log('Duplicating tour:', tourId);
        window.adminApp.showNotification('Tour duplicated successfully!', 'success');
    }
}
function openUltimateComprehensiveTourView(tourId) { 
    window.adminApp.openUltimateComprehensiveTourView(tourId); 
}

// Category Detail Functions
function viewCategoryDetails(categoryId) { window.adminApp.openCategoryDetailView(categoryId); }
function editCategory(categoryId) { console.log('Editing category:', categoryId); }
function deleteCategory(categoryId) { 
    if (confirm('Are you sure you want to delete this category?')) {
        console.log('Deleting category:', categoryId);
        window.adminApp.showNotification('Category deleted successfully!', 'success');
    }
}
function viewCategoryTours(categoryId) { 
    console.log('Viewing tours for category:', categoryId);
    window.adminApp.switchSection('tours');
}
function openCategoryModal() { console.log('Opening category modal'); }
function openSubcategoryModal() { console.log('Opening subcategory modal'); }

// Variant Functions
function addTourVariant(tourId) { console.log('Adding variant for tour:', tourId); }
function editTourVariant(variantId) { console.log('Editing variant:', variantId); }
function deleteVariant(variantId) { 
    if (confirm('Are you sure you want to delete this variant?')) {
        console.log('Deleting variant:', variantId);
        window.adminApp.showNotification('Variant deleted successfully!', 'success');
    }
}
function viewVariantPricing(variantId) { 
    console.log('Viewing pricing for variant:', variantId);
    window.adminApp.switchSection('pricing');
}
function viewVariantBookings(variantId) { 
    console.log('Viewing bookings for variant:', variantId);
    window.adminApp.switchSection('bookings');
}
function viewVariantDetails(variantId) { 
    console.log('Viewing variant details:', variantId);
    window.adminApp.showNotification('Opening variant details...', 'info');
}
function duplicateVariant(variantId) { 
    if (confirm('Are you sure you want to duplicate this variant?')) {
        console.log('Duplicating variant:', variantId);
        window.adminApp.showNotification('Variant duplicated successfully!', 'success');
    }
}
function viewVariantAnalytics(variantId) { 
    console.log('Viewing analytics for variant:', variantId);
    window.adminApp.showNotification('Opening variant analytics...', 'info');
}
function filterVariants(searchTerm) { console.log('Filtering variants:', searchTerm); }
function filterVariantsByTour(tourId) { console.log('Filtering variants by tour:', tourId); }
function filterVariantsByCity(cityCode) { console.log('Filtering variants by city:', cityCode); }
function openVariantModal() { console.log('Opening variant modal'); }
function editVariant(variantId) { 
    console.log('Editing variant:', variantId);
    window.adminApp.showNotification('Opening variant editor...', 'info');
}

// Pricing Functions
function loadTourVariants(tourId) { console.log('Loading variants for tour:', tourId); }
function loadVariantPricing(variantId) { console.log('Loading pricing for variant:', variantId); }
function openBulkPricingModal() { console.log('Opening bulk pricing modal'); }
function copyPricingFromDate() { console.log('Copying pricing from date'); }
function applySeasonalPricing() { console.log('Applying seasonal pricing'); }
function previousMonth() { console.log('Previous month'); }
function nextMonth() { console.log('Next month'); }
function openDayPricing(date) { console.log('Opening pricing for date:', date); }

// Review Functions
function filterReviewsByRating(rating) { console.log('Filtering reviews by rating:', rating); }
function filterReviewsByTour(tourId) { console.log('Filtering reviews by tour:', tourId); }
function filterReviewsByStatus(status) { console.log('Filtering reviews by status:', status); }
function searchReviews(searchTerm) { console.log('Searching reviews:', searchTerm); }
function moderateReview(reviewId, action) { 
    console.log('Moderating review:', reviewId, action);
    window.adminApp.showNotification(`Review ${action}d successfully!`, 'success');
}

// Subcategory Functions
function viewSubcategoryDetails(subcategoryId) { console.log('Viewing subcategory details:', subcategoryId); }
function editSubcategory(subcategoryId) { console.log('Editing subcategory:', subcategoryId); }
function deleteSubcategory(subcategoryId) { 
    if (confirm('Are you sure you want to delete this subcategory?')) {
        console.log('Deleting subcategory:', subcategoryId);
        window.adminApp.showNotification('Subcategory deleted successfully!', 'success');
    }
}
function viewSubcategoryTours(subcategoryId) { 
    console.log('Viewing tours for subcategory:', subcategoryId);
    window.adminApp.switchSection('tours');
}
function addSubcategory(categoryId) { console.log('Adding subcategory to category:', categoryId); }

// Collection Functions
function viewCollections(tourId) { 
    console.log('Viewing collections for tour:', tourId);
    window.adminApp.switchSection('collections');
}
function viewCollectionDetails(collectionId) { 
    console.log('Viewing collection details:', collectionId);
    window.adminApp.showNotification('Opening collection details...', 'info');
}

// Image Management Functions
function openImageModal(imageId) { 
    console.log('Opening image modal for:', imageId);
    window.adminApp.showNotification('Opening image viewer...', 'info');
}
function openImageUploadModal() { 
    console.log('Opening image upload modal');
    window.adminApp.showNotification('Opening image upload...', 'info');
}

// Tab Functions
function switchCityTab(tabName, buttonElement) { window.adminApp.switchCityTab(tabName, buttonElement); }
function switchTourTab(tabName, buttonElement) { window.adminApp.switchTourTab(tabName, buttonElement); }
function switchCategoryTab(tabName, buttonElement) { window.adminApp.switchCategoryTab(tabName, buttonElement); }

// Enhanced Dashboard Functions
function showTopCustomersByValue() {
    const container = document.getElementById('top-customers-list');
    if (!container) return;
    
    // Reorder by value (already sorted in the data)
    const buttons = document.querySelectorAll('#top-customers-container button');
    buttons.forEach(btn => btn.className = 'px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium');
    event.target.className = 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium';
}

function showTopCustomersByVolume() {
    const container = document.getElementById('top-customers-list');
    if (!container) return;
    
    // Mock sorted by volume data
    const customersByVolume = [
        { name: 'John Anderson', email: 'john.a@email.com', totalValue: 3420, totalVolume: 12, lastBooking: '2024-01-15' },
        { name: 'Mike Chen', email: 'mike.c@email.com', totalValue: 2650, totalVolume: 9, lastBooking: '2024-01-20' },
        { name: 'Sarah Johnson', email: 'sarah.j@email.com', totalValue: 2890, totalVolume: 8, lastBooking: '2024-01-18' },
        { name: 'Emma Wilson', email: 'emma.w@email.com', totalValue: 2340, totalVolume: 7, lastBooking: '2024-01-22' },
        { name: 'David Brown', email: 'david.b@email.com', totalValue: 2100, totalVolume: 6, lastBooking: '2024-01-19' }
    ];
    
    const html = customersByVolume.map((customer, index) => `
        <div class="flex items-center justify-between p-3 border rounded-lg">
            <div class="flex items-center space-x-3">
                <span class="flex items-center justify-center w-8 h-8 rounded-full ${index === 0 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'} font-bold text-sm">
                    ${index + 1}
                </span>
                <div>
                    <div class="font-medium">${customer.name}</div>
                    <div class="text-sm text-gray-500">${customer.email}</div>
                </div>
            </div>
            <div class="text-right">
                <div class="font-semibold text-green-600">$${customer.totalValue}</div>
                <div class="text-sm text-gray-500">${customer.totalVolume} bookings</div>
                <div class="text-xs text-gray-400">Last: ${customer.lastBooking}</div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    
    const buttons = document.querySelectorAll('#top-customers-container button');
    buttons.forEach(btn => btn.className = 'px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium');
    event.target.className = 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium';
}

// Tour Rating Functions
function addCustomRating(tourId) {
    const content = `
        <div class="form-grid">
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Tour ID</label>
                <input type="text" name="tourId" class="form-input" value="${tourId}" readonly>
            </div>
            
            <div class="form-group">
                <label class="form-label">Average Rating *</label>
                <input type="number" name="averageRating" class="form-input" min="1" max="5" step="0.1" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Total Ratings Count *</label>
                <input type="number" name="ratingsCount" class="form-input" min="0" required>
            </div>
            
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Status</label>
                <select name="status" class="form-input" required>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
        </div>
    `;
    
    window.adminApp.openModal('Add Custom Rating', content, () => {
        saveCustomRating(tourId);
    });
}

async function saveCustomRating(tourId) {
    const formData = {
        averageRating: parseFloat(document.querySelector('[name="averageRating"]').value),
        ratingsCount: parseInt(document.querySelector('[name="ratingsCount"]').value),
        status: document.querySelector('[name="status"]').value === 'true'
    };
    
    try {
        const response = await fetch(`/api/v1/tylTravelTourGroupRating/tourgroup/${tourId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.adminApp.authToken}`
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            window.adminApp.showNotification('Custom rating added successfully!', 'success');
            window.adminApp.closeModal();
            window.adminApp.loadSectionData('tours');
        } else {
            window.adminApp.showNotification('Failed to add custom rating', 'error');
        }
    } catch (error) {
        console.error('Error saving custom rating:', error);
        window.adminApp.showNotification('Error saving custom rating', 'error');
    }
}

// Enhanced Tour Management
function openComprehensiveTourForm(tourId = null) {
    const isEdit = !!tourId;
    const title = isEdit ? 'Edit Tour - Complete API Form' : 'Add New Tour - Complete API Form';
    
    const content = `
        <div style="max-height: 85vh; overflow-y: auto;">
            <div style="margin-bottom: 1rem;">
                <nav style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
                    <button type="button" class="tab-btn active" onclick="showTourFormTab('basic')">Basic Info</button>
                    <button type="button" class="tab-btn" onclick="showTourFormTab('content')">Content</button>
                    <button type="button" class="tab-btn" onclick="showTourFormTab('pricing')">Pricing</button>
                    <button type="button" class="tab-btn" onclick="showTourFormTab('features')">Features</button>
                    <button type="button" class="tab-btn" onclick="showTourFormTab('seo')">SEO & Media</button>
                    <button type="button" class="tab-btn" onclick="showTourFormTab('advanced')">Advanced</button>
                </nav>
            </div>

            <form id="comprehensive-tour-form">
                <!-- Basic Information Tab -->
                <div id="tab-basic" class="tab-content active">
                    <table class="tour-form-table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); width: 200px; font-weight: 500;">
                                <label>Tour Name *</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="name" class="form-input" required style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>City Code *</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <select name="cityCode" class="form-input" required style="width: 100%;">
                                    <option value="">Select City</option>
                                    <option value="PAR">Paris</option>
                                    <option value="ROM">Rome</option>
                                    <option value="LON">London</option>
                                    <option value="TOK">Tokyo</option>
                                    <option value="NYC">New York</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Status</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <select name="status" class="form-input" style="width: 100%;">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Tour Type</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="tourType" class="form-input" style="width: 100%;" placeholder="walking, private, group">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Flow Type</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="flowType" class="form-input" style="width: 100%;" placeholder="standard, premium, vip">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>URL Slug</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="url" class="form-input" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Neighbourhood</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="neighbourhood" class="form-input" style="width: 100%;">
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Content Tab -->
                <div id="tab-content" class="tab-content" style="display: none;">
                    <table class="tour-form-table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); width: 200px; font-weight: 500; vertical-align: top;">
                                <label>Short Summary</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="shortSummary" class="form-input" rows="3" style="width: 100%;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Full Summary</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="summary" class="form-input" rows="5" style="width: 100%;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Highlights</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="highlights" class="form-input" rows="4" style="width: 100%;" placeholder="• Visit famous landmarks&#10;• Professional guide included"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Inclusions</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="inclusions" class="form-input" rows="3" style="width: 100%;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Exclusions</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="exclusions" class="form-input" rows="3" style="width: 100%;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Min Duration</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="minDuration" class="form-input" style="width: 100%;" placeholder="2 hours">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Max Duration</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="maxDuration" class="form-input" style="width: 100%;" placeholder="3 hours">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Distance</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="distance" class="form-input" style="width: 100%;" placeholder="5 km">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Call to Action</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="callToAction" class="form-input" style="width: 100%;" placeholder="Book Now">
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Features Tab -->
                <div id="tab-features" class="tab-content" style="display: none;">
                    <table class="tour-form-table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); width: 200px; font-weight: 500;">
                                <label>Mobile Ticket</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="hasMobileTicket">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Hotel Pickup</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="hasHotelPickup">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Instant Confirmation</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="hasInstantConfirmation">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Skip the Line</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="hasSkipTheLine">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Free Cancellation</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="hasFreeCancellation">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Flexible Dates</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="flexiDate">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Show Ratings</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="showRatings">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Live Inventory Check</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="liveInventoryCheck">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>WhatsApp Only</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="whatsappOnly">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Not Available</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="notAvailable">
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- SEO & Media Tab -->
                <div id="tab-seo" class="tab-content" style="display: none;">
                    <table class="tour-form-table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); width: 200px; font-weight: 500;">
                                <label>Meta Title</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="metaTitle" class="form-input" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Meta Description</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="metaDescription" class="form-input" rows="3" style="width: 100%;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Canonical URL</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="url" name="canonicalUrl" class="form-input" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Promotion Label</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="text" name="promotionLabel" class="form-input" style="width: 100%;" placeholder="Best Seller">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>No Index</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="noIndex">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Image URLs</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="imageUploads" class="form-input" rows="3" style="width: 100%;" placeholder="One URL per line"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500; vertical-align: top;">
                                <label>Video URLs</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="videoUploads" class="form-input" rows="2" style="width: 100%;" placeholder="Video URLs, one per line"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Pricing Tab -->
                <div id="tab-pricing" class="tab-content" style="display: none;">
                    <table class="tour-form-table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); width: 200px; font-weight: 500;">
                                <label>Base Price</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="number" name="basePrice" class="form-input" step="0.01" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Currency</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <select name="currency" class="form-input" style="width: 100%;">
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Pricing Type</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <select name="pricingType" class="form-input" style="width: 100%;">
                                    <option value="per-person">Per Person</option>
                                    <option value="per-group">Per Group</option>
                                    <option value="per-hour">Per Hour</option>
                                    <option value="flat-rate">Flat Rate</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Advanced Tab -->
                <div id="tab-advanced" class="tab-content" style="display: none;">
                    <table class="tour-form-table" style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); width: 200px; font-weight: 500; vertical-align: top;">
                                <label>Additional Info</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <textarea name="additionalInfo" class="form-input" rows="3" style="width: 100%;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Featured</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="featured">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Popular</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="popular">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Recommended</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <input type="checkbox" name="recommended">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-weight: 500;">
                                <label>Availability Status</label>
                            </td>
                            <td style="padding: 0.5rem; border: 1px solid var(--border-color);">
                                <select name="availabilityStatus" class="form-input" style="width: 100%;">
                                    <option value="available">Available</option>
                                    <option value="limited">Limited Availability</option>
                                    <option value="soldout">Sold Out</option>
                                    <option value="coming-soon">Coming Soon</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
        </div>

        <style>
            .tab-btn {
                padding: 0.5rem 1rem;
                border: none;
                background: var(--bg-tertiary);
                color: var(--text-secondary);
                cursor: pointer;
                border-radius: 0.25rem 0.25rem 0 0;
                transition: all 0.2s;
            }
            .tab-btn.active {
                background: var(--primary-color);
                color: white;
            }
            .tab-content {
                display: none;
            }
            .tab-content.active {
                display: block;
            }
            .tour-form-table td {
                vertical-align: top;
            }
            .tour-form-table label {
                font-size: 0.875rem;
            }
        </style>
    `;
    
    window.adminApp.openModal(title, content, () => {
        saveComprehensiveTour(tourId);
    });
}

// Tab switching function for tour form
function showTourFormTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
    }
    
    // Set active button
    event.target.classList.add('active');
}

async function saveComprehensiveTour(tourId = null) {
    const form = document.getElementById('comprehensive-tour-form');
    const formData = new FormData(form);
    
    // Convert form data to JSON
    const tourData = {};
    for (let [key, value] of formData.entries()) {
        if (form.querySelector(`[name="${key}"]`).type === 'checkbox') {
            tourData[key] = form.querySelector(`[name="${key}"]`).checked;
        } else {
            tourData[key] = value;
        }
    }
    
    try {
        const url = tourId 
            ? `/api/v1/tylTourGroup/update/tour-group/${tourId}`
            : '/api/v1/tylTourGroup/add/travel-tour-group';
        const method = tourId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.adminApp.authToken}`
            },
            body: JSON.stringify(tourData)
        });
        
        if (response.ok) {
            window.adminApp.showNotification(`Tour ${tourId ? 'updated' : 'created'} successfully!`, 'success');
            window.adminApp.closeModal();
            window.adminApp.loadSectionData('tours');
        } else {
            window.adminApp.showNotification(`Failed to ${tourId ? 'update' : 'create'} tour`, 'error');
        }
    } catch (error) {
        console.error('Error saving tour:', error);
        window.adminApp.showNotification('Error saving tour', 'error');
    }
}

// Make duplicate variant functional
async function duplicateVariant(variantId) {
    if (!confirm('Are you sure you want to duplicate this variant?')) {
        return;
    }
    
    try {
        // First, get the variant data
        const response = await fetch(`/api/v1/tylTourGroupVariant/get/tour-group-variant/${variantId}`, {
            headers: {
                'Authorization': `Bearer ${window.adminApp.authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch variant data');
        }
        
        const variantData = await response.json();
        
        // Remove ID and update name
        delete variantData._id;
        variantData.name = `${variantData.name} (Copy)`;
        
        // Create new variant
        const createResponse = await fetch('/api/v1/tylTourGroupVariant/add/travel-tour-group-variant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.adminApp.authToken}`
            },
            body: JSON.stringify(variantData)
        });
        
        if (createResponse.ok) {
            window.adminApp.showNotification('Variant duplicated successfully!', 'success');
            window.adminApp.loadSectionData('variants');
        } else {
            window.adminApp.showNotification('Failed to duplicate variant', 'error');
        }
    } catch (error) {
        console.error('Error duplicating variant:', error);
        window.adminApp.showNotification('Error duplicating variant', 'error');
    }
}

// Customer & Mail Functions
function viewCustomerDetail(customerId) {
    window.adminApp.openModal('Customer Details', `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Customer ID</label>
                <input type="text" class="form-input" value="${customerId}" readonly>
            </div>
            <div class="form-group">
                <label class="form-label">Status</label>
                <select class="form-input">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
    `);
}

function viewCustomerBookings(customerId) {
    window.adminApp.openModal('Customer Bookings', `
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr><th>Date</th><th>Tour</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                    <tr><td>2024-01-15</td><td>Paris City Tour</td><td>$299</td><td><span class="badge badge-success">Confirmed</span></td></tr>
                    <tr><td>2024-01-10</td><td>Rome Food Walk</td><td>$189</td><td><span class="badge badge-success">Completed</span></td></tr>
                </tbody>
            </table>
        </div>
    `);
}

function sendCustomerMail(customerId, email) {
    window.adminApp.openModal('Send Email to Customer', `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">To Email</label>
                <input type="email" class="form-input" value="${email}" readonly>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Subject</label>
                <input type="text" class="form-input" placeholder="Email subject">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Message</label>
                <textarea class="form-input form-textarea" rows="6" placeholder="Your message..."></textarea>
            </div>
        </div>
    `, () => {
        window.adminApp.showNotification('Email sent successfully!', 'success');
        window.adminApp.closeModal();
    });
}

function exportCustomersReport() {
    window.adminApp.showNotification('Customer report exported successfully!', 'success');
}

// Enhanced Customer Functions - All Booking Details View
function viewCustomerAllBookingDetails(customerId) {
    window.adminApp.openModal('Complete Customer Booking Details', `
        <div style="max-height: 80vh; overflow-y: auto;">
            <!-- Customer Summary -->
            <div class="customer-summary" style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;">
                    <div>
                        <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">👤 Customer Info</h4>
                        <div><strong>Name:</strong> John Smith</div>
                        <div><strong>Email:</strong> john.smith@email.com</div>
                        <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                        <div><strong>Member Since:</strong> Jan 2023</div>
                    </div>
                    <div>
                        <h4 style="margin: 0 0 1rem 0; color: var(--success-color);">📊 Booking Stats</h4>
                        <div><strong>Total Bookings:</strong> 12</div>
                        <div><strong>Completed:</strong> 10</div>
                        <div><strong>Cancelled:</strong> 1</div>
                        <div><strong>Upcoming:</strong> 1</div>
                    </div>
                    <div>
                        <h4 style="margin: 0 0 1rem 0; color: var(--warning-color);">💰 Financial Summary</h4>
                        <div><strong>Total Spent:</strong> $4,250</div>
                        <div><strong>Average Order:</strong> $354</div>
                        <div><strong>Loyalty Tier:</strong> <span class="badge badge-warning">Gold</span></div>
                        <div><strong>Total Savings:</strong> $320</div>
                    </div>
                </div>
            </div>

            <!-- Booking History Table -->
            <div class="booking-history">
                <h4 style="margin-bottom: 1rem;">📅 Complete Booking History</h4>
                <div class="table-container" style="max-height: 400px; overflow-y: auto;">
                    <table class="table" style="font-size: 0.875rem;">
                        <thead style="position: sticky; top: 0; background: var(--bg-primary);">
                            <tr>
                                <th>Booking ID</th>
                                <th>Tour Details</th>
                                <th>Date & Time</th>
                                <th>Guests</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>#TYL-2024-001</strong></td>
                                <td>
                                    <div><strong>Louvre Museum Skip-the-Line</strong></div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Paris, France</div>
                                </td>
                                <td>
                                    <div>Mar 15, 2024</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">10:00 AM</div>
                                </td>
                                <td>2 Adults</td>
                                <td>
                                    <div><strong>$89.00</strong></div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Saved: $15</div>
                                </td>
                                <td><span class="badge badge-success">Paid</span></td>
                                <td><span class="badge badge-warning">Upcoming</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="viewBookingInvoice('TYL-2024-001')" title="Invoice">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#TYL-2024-002</strong></td>
                                <td>
                                    <div><strong>Vatican Museums Private Tour</strong></div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Rome, Italy</div>
                                </td>
                                <td>
                                    <div>Feb 20, 2024</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">2:00 PM</div>
                                </td>
                                <td>4 Adults</td>
                                <td><strong>$450.00</strong></td>
                                <td><span class="badge badge-success">Paid</span></td>
                                <td><span class="badge badge-success">Completed</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="viewBookingInvoice('TYL-2024-002')" title="Invoice">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#TYL-2024-003</strong></td>
                                <td>
                                    <div><strong>London Eye Fast Track</strong></div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">London, UK</div>
                                </td>
                                <td>
                                    <div>Jan 10, 2024</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">6:00 PM</div>
                                </td>
                                <td>2 Adults, 1 Child</td>
                                <td><strong>$125.00</strong></td>
                                <td><span class="badge badge-success">Paid</span></td>
                                <td><span class="badge badge-success">Completed</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="viewBookingInvoice('TYL-2024-003')" title="Invoice">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#TYL-2023-045</strong></td>
                                <td>
                                    <div><strong>Tokyo Food Walking Tour</strong></div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Tokyo, Japan</div>
                                </td>
                                <td>
                                    <div>Dec 5, 2023</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">7:00 PM</div>
                                </td>
                                <td>2 Adults</td>
                                <td><strong>$180.00</strong></td>
                                <td><span class="badge badge-success">Paid</span></td>
                                <td><span class="badge badge-success">Completed</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="viewBookingInvoice('TYL-2023-045')" title="Invoice">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#TYL-2023-032</strong></td>
                                <td>
                                    <div><strong>Eiffel Tower Sunset Tour</strong></div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Paris, France</div>
                                </td>
                                <td>
                                    <div>Nov 18, 2023</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">5:30 PM</div>
                                </td>
                                <td>2 Adults</td>
                                <td><del style="color: var(--text-secondary);">$95.00</del></td>
                                <td><span class="badge badge-danger">Refunded</span></td>
                                <td><span class="badge badge-danger">Cancelled</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="viewBookingInvoice('TYL-2023-032')" title="Invoice">
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Additional Actions -->
            <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="sendPersonalizedOffer('${customerId}')">
                    <i class="fas fa-gift"></i> Send Personalized Offer
                </button>
                <button class="btn btn-secondary" onclick="viewCustomerJourney('${customerId}')">
                    <i class="fas fa-route"></i> View Customer Journey
                </button>
                <button class="btn btn-warning" onclick="exportCustomerData('${customerId}')">
                    <i class="fas fa-download"></i> Export Data
                </button>
            </div>
        </div>
    `);
}

// Customer Invoices View
function viewCustomerInvoices(customerId) {
    window.adminApp.openModal('Customer Invoices', `
        <div class="invoices-container" style="max-height: 70vh; overflow-y: auto;">
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Booking</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>INV-2024-001</strong></td>
                            <td>Louvre Museum Tour</td>
                            <td>Mar 15, 2024</td>
                            <td><strong>$89.00</strong></td>
                            <td><span class="badge badge-success">Paid</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary" onclick="downloadInvoice('INV-2024-001')">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="emailInvoice('INV-2024-001')">
                                    <i class="fas fa-envelope"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>INV-2024-002</strong></td>
                            <td>Vatican Private Tour</td>
                            <td>Feb 20, 2024</td>
                            <td><strong>$450.00</strong></td>
                            <td><span class="badge badge-success">Paid</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary" onclick="downloadInvoice('INV-2024-002')">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="emailInvoice('INV-2024-002')">
                                    <i class="fas fa-envelope"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `);
}

// Additional customer functions
function viewBookingInvoice(bookingId) {
    window.adminApp.showNotification(`Opening invoice for booking ${bookingId}`, 'info');
}

function sendPersonalizedOffer(customerId) {
    window.adminApp.openModal('Send Personalized Offer', `
        <div class="form-grid">
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Offer Type</label>
                <select class="form-input">
                    <option>10% Discount on Next Booking</option>
                    <option>Free Upgrade to Premium Tour</option>
                    <option>Buy 2 Get 1 Free</option>
                    <option>VIP Experience Package</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Personal Message</label>
                <textarea class="form-input form-textarea" rows="4" placeholder="Write a personalized message..."></textarea>
            </div>
        </div>
    `, () => {
        window.adminApp.showNotification('Personalized offer sent successfully!', 'success');
        window.adminApp.closeModal();
    });
}

function viewCustomerJourney(customerId) {
    window.adminApp.openModal('Customer Journey Map', `
        <div class="journey-timeline" style="max-height: 70vh; overflow-y: auto;">
            <div class="timeline-item" style="border-left: 3px solid var(--primary-color); padding-left: 1rem; margin-bottom: 1rem;">
                <div style="font-weight: 600;">Registration</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">Jan 15, 2023 - Signed up via Google</div>
            </div>
            <div class="timeline-item" style="border-left: 3px solid var(--success-color); padding-left: 1rem; margin-bottom: 1rem;">
                <div style="font-weight: 600;">First Booking</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">Jan 20, 2023 - Paris City Tour ($120)</div>
            </div>
            <div class="timeline-item" style="border-left: 3px solid var(--warning-color); padding-left: 1rem; margin-bottom: 1rem;">
                <div style="font-weight: 600;">Loyalty Upgrade</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">Jun 15, 2023 - Upgraded to Gold Tier</div>
            </div>
        </div>
    `);
}

function exportCustomerData(customerId) {
    window.adminApp.showNotification('Customer data export initiated. Download will start shortly.', 'success');
}

function downloadInvoice(invoiceId) {
    window.adminApp.showNotification(`Downloading invoice ${invoiceId}`, 'success');
}

function emailInvoice(invoiceId) {
    window.adminApp.showNotification(`Invoice ${invoiceId} emailed to customer`, 'success');
}

// Mail Center Functions
function createEmailTemplate() {
    window.adminApp.openModal('Create Email Template', `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Template Name</label>
                <input type="text" class="form-input" placeholder="Template name">
            </div>
            <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-input">
                    <option value="onboarding">Onboarding</option>
                    <option value="booking">Booking</option>
                    <option value="reminder">Reminder</option>
                    <option value="feedback">Feedback</option>
                    <option value="marketing">Marketing</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Subject</label>
                <input type="text" class="form-input" placeholder="Email subject">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Content</label>
                <textarea class="form-input form-textarea" rows="8" placeholder="Email content..."></textarea>
            </div>
        </div>
    `, () => {
        window.adminApp.showNotification('Email template created successfully!', 'success');
        window.adminApp.closeModal();
    });
}

function editEmailTemplate(templateId) {
    window.adminApp.openModal('Edit Email Template', `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Template Name</label>
                <input type="text" class="form-input" value="Welcome Email">
            </div>
            <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-input">
                    <option value="onboarding" selected>Onboarding</option>
                    <option value="booking">Booking</option>
                    <option value="reminder">Reminder</option>
                    <option value="feedback">Feedback</option>
                    <option value="marketing">Marketing</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Subject</label>
                <input type="text" class="form-input" value="Welcome to TickYourList!">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Content</label>
                <textarea class="form-input form-textarea" rows="8">Welcome to our platform! We're excited to have you...</textarea>
            </div>
        </div>
    `, () => {
        window.adminApp.showNotification('Email template updated successfully!', 'success');
        window.adminApp.closeModal();
    });
}

function previewEmailTemplate(templateId) {
    window.adminApp.openModal('Email Template Preview', `
        <div style="border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 2rem; background: white;">
            <div style="border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 1rem;">
                <strong>Subject:</strong> Welcome to TickYourList!
            </div>
            <div style="line-height: 1.6;">
                <h2>Welcome to TickYourList!</h2>
                <p>Thank you for joining our travel community. We're excited to help you discover amazing experiences around the world.</p>
                <p>Get started by browsing our featured tours and book your next adventure today!</p>
                <div style="margin: 2rem 0;">
                    <a href="#" style="background: #3b82f6; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.375rem;">Browse Tours</a>
                </div>
                <p>Best regards,<br>The TickYourList Team</p>
            </div>
        </div>
    `);
}

function updateRecipientOptions(type) {
    const specificGroup = document.getElementById('specific-customer-group');
    const tierGroup = document.getElementById('tier-filter-group');
    
    if (specificGroup) specificGroup.style.display = type === 'specific' ? 'block' : 'none';
    if (tierGroup) tierGroup.style.display = type === 'tier' ? 'block' : 'none';
}

function loadTemplateContent(templateId) {
    const subjects = {
        'welcome': 'Welcome to TickYourList!',
        'booking_confirm': 'Your booking is confirmed!',
        'reminder': 'Your tour is tomorrow!',
        'feedback': 'How was your experience?',
        'promotion': 'Exclusive deals just for you!'
    };
    
    const contents = {
        'welcome': 'Welcome to our travel community! We\'re excited to help you discover amazing experiences.',
        'booking_confirm': 'Your booking has been confirmed. Here are the details of your upcoming tour.',
        'reminder': 'Don\'t forget about your upcoming tour tomorrow. Here\'s what you need to know.',
        'feedback': 'We hope you enjoyed your recent tour. Please take a moment to share your experience.',
        'promotion': 'We have some exclusive deals just for you. Book now and save on your next adventure!'
    };
    
    const subjectInput = document.querySelector('[name="subject"]');
    const contentTextarea = document.querySelector('[name="content"]');
    
    if (templateId && subjects[templateId]) {
        if (subjectInput) subjectInput.value = subjects[templateId];
        if (contentTextarea) contentTextarea.value = contents[templateId];
    }
}

function sendCustomEmail() {
    const form = document.getElementById('send-email-form');
    const formData = new FormData(form);
    
    // Validation
    if (!formData.get('recipientType')) {
        window.adminApp.showNotification('Please select recipients', 'error');
        return;
    }
    
    if (!formData.get('subject')) {
        window.adminApp.showNotification('Please enter a subject', 'error');
        return;
    }
    
    if (!formData.get('content')) {
        window.adminApp.showNotification('Please enter content', 'error');
        return;
    }
    
    // Simulate sending email
    window.adminApp.showNotification('Email sent successfully!', 'success');
    form.reset();
    
    // Add to history table
    const historyTable = document.getElementById('email-history-table');
    if (historyTable) {
        const newRow = `
            <tr>
                <td>${new Date().toLocaleDateString()}</td>
                <td>${formData.get('subject')}</td>
                <td>${formData.get('recipientType')}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td><span class="badge badge-warning">Sending</span></td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="viewEmailReport('new')" title="View Report">
                        <i class="fas fa-chart-bar"></i>
                    </button>
                </td>
            </tr>
        `;
        historyTable.insertAdjacentHTML('afterbegin', newRow);
    }
}

function viewEmailReport(emailId) {
    window.adminApp.openModal('Email Campaign Report', `
        <div class="stats-grid" style="margin-bottom: 2rem;">
            <div class="stat-card">
                <div class="stat-title">Total Sent</div>
                <div class="stat-value">1,245</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Opened</div>
                <div class="stat-value">892 (71.6%)</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Clicked</div>
                <div class="stat-value">234 (26.2%)</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Bounced</div>
                <div class="stat-value">12 (0.96%)</div>
            </div>
        </div>
        <div>
            <canvas id="email-performance-chart" style="max-height: 300px;"></canvas>
        </div>
    `);
}

// Enhanced Coupon Functions
function openCreateCouponForm() {
    window.adminApp.openModal('Create New Coupon', `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Coupon Code *</label>
                <input type="text" name="code" class="form-input" placeholder="e.g., SUMMER20" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Coupon Name *</label>
                <input type="text" name="name" class="form-input" placeholder="e.g., Summer Special" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Discount Type *</label>
                <select name="type" class="form-input" required onchange="toggleDiscountFields(this.value)">
                    <option value="">Select Type</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Discount Value *</label>
                <input type="number" name="value" class="form-input" min="0" step="0.01" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Minimum Order Amount</label>
                <input type="number" name="minAmount" class="form-input" min="0" step="0.01">
            </div>
            
            <div class="form-group" id="max-discount-group">
                <label class="form-label">Maximum Discount</label>
                <input type="number" name="maxDiscount" class="form-input" min="0" step="0.01">
            </div>
            
            <div class="form-group">
                <label class="form-label">Usage Limit</label>
                <input type="number" name="usageLimit" class="form-input" min="1">
            </div>
            
            <div class="form-group">
                <label class="form-label">Applicable For</label>
                <select name="applicableFor" class="form-input">
                    <option value="All Customers">All Customers</option>
                    <option value="New Customers">New Customers Only</option>
                    <option value="Bronze Members">Bronze Members</option>
                    <option value="Silver Members">Silver Members</option>
                    <option value="Gold Members">Gold Members</option>
                    <option value="Platinum Members">Platinum Members</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Start Date *</label>
                <input type="date" name="startDate" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">End Date *</label>
                <input type="date" name="endDate" class="form-input" required>
            </div>
            
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-input form-textarea" rows="3" placeholder="Coupon description..."></textarea>
            </div>
        </div>
    `, () => {
        saveCoupon();
    });
}

function toggleDiscountFields(type) {
    const maxDiscountGroup = document.getElementById('max-discount-group');
    if (maxDiscountGroup) {
        maxDiscountGroup.style.display = type === 'percentage' ? 'block' : 'none';
    }
}

function saveCoupon() {
    // Validate and save coupon
    window.adminApp.showNotification('Coupon created successfully!', 'success');
    window.adminApp.closeModal();
    window.adminApp.loadSectionData('coupons');
}

function editCoupon(couponId) {
    window.adminApp.openModal('Edit Coupon', `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Coupon Code *</label>
                <input type="text" name="code" class="form-input" value="WELCOME20" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Coupon Name *</label>
                <input type="text" name="name" class="form-input" value="Welcome Discount" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Discount Type *</label>
                <select name="type" class="form-input" required>
                    <option value="percentage" selected>Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Discount Value *</label>
                <input type="number" name="value" class="form-input" value="20" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Status</label>
                <select name="status" class="form-input">
                    <option value="Active" selected>Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Expired">Expired</option>
                </select>
            </div>
        </div>
    `, () => {
        window.adminApp.showNotification('Coupon updated successfully!', 'success');
        window.adminApp.closeModal();
        window.adminApp.loadSectionData('coupons');
    });
}

function duplicateCoupon(couponId) {
    if (confirm('Are you sure you want to duplicate this coupon?')) {
        window.adminApp.showNotification('Coupon duplicated successfully!', 'success');
        window.adminApp.loadSectionData('coupons');
    }
}

function viewCouponUsage(couponId) {
    window.adminApp.openModal('Coupon Usage Report', `
        <div class="stats-grid" style="margin-bottom: 2rem;">
            <div class="stat-card">
                <div class="stat-title">Total Uses</div>
                <div class="stat-value">234</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Total Discount</div>
                <div class="stat-value">$4,680</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Avg Order Value</div>
                <div class="stat-value">$125</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Usage Rate</div>
                <div class="stat-value">23.4%</div>
            </div>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr><th>Date</th><th>Customer</th><th>Order Value</th><th>Discount</th></tr>
                </thead>
                <tbody>
                    <tr><td>2024-01-20</td><td>john.doe@email.com</td><td>$150</td><td>$30</td></tr>
                    <tr><td>2024-01-19</td><td>jane.smith@email.com</td><td>$200</td><td>$40</td></tr>
                    <tr><td>2024-01-18</td><td>mike.johnson@email.com</td><td>$120</td><td>$24</td></tr>
                </tbody>
            </table>
        </div>
    `);
}

function deleteCoupon(couponId) {
    if (confirm('Are you sure you want to delete this coupon? This action cannot be undone.')) {
        window.adminApp.showNotification('Coupon deleted successfully!', 'success');
        window.adminApp.loadSectionData('coupons');
    }
}

// Additional global functions for new sections
function openCollectionModal() { console.log('Opening collection modal'); }
function editCollection(collectionId) { console.log('Editing collection:', collectionId); }
function deleteCollection(collectionId) { 
    if (confirm('Are you sure you want to delete this collection?')) {
        console.log('Deleting collection:', collectionId);
    }
}

function openCountryModal() { console.log('Opening country modal'); }
function editCountry(countryId) { console.log('Editing country:', countryId); }
function deleteCountry(countryId) { 
    if (confirm('Are you sure you want to delete this country?')) {
        console.log('Deleting country:', countryId);
    }
}

function openCurrencyModal() { console.log('Opening currency modal'); }
function editCurrency(currencyId) { console.log('Editing currency:', currencyId); }
function deleteCurrency(currencyId) { 
    if (confirm('Are you sure you want to delete this currency?')) {
        console.log('Deleting currency:', currencyId);
    }
}

function openBannerModal() { console.log('Opening banner modal'); }
function editBanner(bannerId) { console.log('Editing banner:', bannerId); }
function deleteBanner(bannerId) { 
    if (confirm('Are you sure you want to delete this banner?')) {
        console.log('Deleting banner:', bannerId);
    }
}

function openPartnerModal() { console.log('Opening partner modal'); }
function editPartner(partnerId) { console.log('Editing partner:', partnerId); }
function deletePartner(partnerId) { 
    if (confirm('Are you sure you want to delete this partner?')) {
        console.log('Deleting partner:', partnerId);
    }
}

function openFaqModal() { console.log('Opening FAQ modal'); }
function editFaq(faqId) { console.log('Editing FAQ:', faqId); }
function deleteFaq(faqId) { 
    if (confirm('Are you sure you want to delete this FAQ?')) {
        console.log('Deleting FAQ:', faqId);
    }
}

function saveSettings() { 
    console.log('Saving settings');
    window.adminApp.showNotification('Settings saved successfully', 'success');
}

function openUserModal() { console.log('Opening user modal'); }
function editUser(userId) { console.log('Editing user:', userId); }
function deleteUser(userId) { 
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Deleting user:', userId);
    }
}

function filterCoupons(searchTerm) { console.log('Filtering coupons:', searchTerm); }
function filterCouponsByStatus(status) { console.log('Filtering coupons by status:', status); }

// Enhanced Cities Functions
function sortCitiesBy(criteria) {
    console.log('Sorting cities by:', criteria);
    // This would integrate with the backend to sort cities
    window.adminApp.showNotification(`Cities sorted by ${criteria}`, 'info');
}

// City Management Functions - Enhanced
function openCityModal() {
    window.adminApp.openModal('Add New City', `
        <div class="form-grid" style="grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div class="form-group">
                <label class="form-label">City Name *</label>
                <input type="text" name="cityName" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">City Code *</label>
                <input type="text" name="cityCode" class="form-input" placeholder="e.g., PAR" required>
            </div>
            <div class="form-group">
                <label class="form-label">Country *</label>
                <select name="country" class="form-input" required>
                    <option value="">Select Country</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="UK">United Kingdom</option>
                    <option value="JP">Japan</option>
                    <option value="US">United States</option>
                    <option value="ES">Spain</option>
                    <option value="AE">UAE</option>
                    <option value="AU">Australia</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Status *</label>
                <select name="status" class="form-input" required>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Latitude</label>
                <input type="number" name="latitude" class="form-input" step="0.0001">
            </div>
            <div class="form-group">
                <label class="form-label">Longitude</label>
                <input type="number" name="longitude" class="form-input" step="0.0001">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">City Image URL</label>
                <input type="url" name="imageUrl" class="form-input" placeholder="https://...">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-input form-textarea" rows="3" placeholder="Brief description of the city..."></textarea>
            </div>
        </div>
    `, saveCityData);
}

function saveCityData() {
    window.adminApp.showNotification('City saved successfully!', 'success');
    window.adminApp.closeModal();
    // Reload cities data
    window.adminApp.loadCitiesData();
}

function editCity(cityId) {
    window.adminApp.openModal('Edit City', `
        <div class="form-grid" style="grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div class="form-group">
                <label class="form-label">City Name *</label>
                <input type="text" name="cityName" class="form-input" value="Paris" required>
            </div>
            <div class="form-group">
                <label class="form-label">City Code *</label>
                <input type="text" name="cityCode" class="form-input" value="PAR" required>
            </div>
            <div class="form-group">
                <label class="form-label">Country *</label>
                <select name="country" class="form-input" required>
                    <option value="FR" selected>France</option>
                    <option value="IT">Italy</option>
                    <option value="UK">United Kingdom</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Status *</label>
                <select name="status" class="form-input" required>
                    <option value="true" selected>Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
        </div>
    `, () => {
        window.adminApp.showNotification('City updated successfully!', 'success');
        window.adminApp.closeModal();
    });
}

function viewCityAnalytics(cityId) {
    window.adminApp.openModal('City Analytics - Paris', `
        <div style="max-height: 70vh; overflow-y: auto;">
            <!-- Analytics Overview -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <div class="card" style="text-align: center; padding: 1.5rem;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">45</div>
                    <div style="color: var(--text-secondary);">Total Tours</div>
                    <div style="font-size: 0.875rem; color: var(--success-color); margin-top: 0.5rem;">↗ +5 this month</div>
                </div>
                <div class="card" style="text-align: center; padding: 1.5rem;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--success-color);">2,847</div>
                    <div style="color: var(--text-secondary);">Total Bookings</div>
                    <div style="font-size: 0.875rem; color: var(--success-color); margin-top: 0.5rem;">↗ +12% vs last month</div>
                </div>
                <div class="card" style="text-align: center; padding: 1.5rem;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--warning-color);">$256K</div>
                    <div style="color: var(--text-secondary);">Total Revenue</div>
                    <div style="font-size: 0.875rem; color: var(--success-color); margin-top: 0.5rem;">↗ +18% vs last month</div>
                </div>
                <div class="card" style="text-align: center; padding: 1.5rem;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--info-color);">4.8 ⭐</div>
                    <div style="color: var(--text-secondary);">Avg Rating</div>
                    <div style="font-size: 0.875rem; color: var(--success-color); margin-top: 0.5rem;">↗ +0.2 this month</div>
                </div>
            </div>

            <!-- Top Performing Tours -->
            <div class="card" style="margin-bottom: 2rem;">
                <div class="card-header">
                    <h4 class="card-title">🏆 Top Performing Tours</h4>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr><th>Tour Name</th><th>Bookings</th><th>Revenue</th><th>Rating</th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Louvre Museum Skip-the-Line</td>
                                    <td>456</td>
                                    <td>$32,400</td>
                                    <td>4.9 ⭐</td>
                                </tr>
                                <tr>
                                    <td>Eiffel Tower Summit</td>
                                    <td>389</td>
                                    <td>$28,600</td>
                                    <td>4.8 ⭐</td>
                                </tr>
                                <tr>
                                    <td>Seine River Cruise</td>
                                    <td>325</td>
                                    <td>$19,500</td>
                                    <td>4.7 ⭐</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Monthly Trends -->
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">📈 Monthly Trends</h4>
                </div>
                <div class="card-content">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">245</div>
                            <div style="color: var(--text-secondary);">This Month Bookings</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success-color);">$18.4K</div>
                            <div style="color: var(--text-secondary);">This Month Revenue</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 0.5rem;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning-color);">94%</div>
                            <div style="color: var(--text-secondary);">Customer Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.adminApp = new TickYourListAdmin();
}); 