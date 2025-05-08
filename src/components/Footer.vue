<template>
    <footer class="global-footer">
        <div class="container">
            <div class="footer-content">
                <p class="mb-0">&copy; 2025 TrackSpend. All rights reserved.</p>
                <div class="footer-links">
                    <router-link to="/about" class="footer-link"
                        >About</router-link
                    >
                    <router-link to="/contact" class="footer-link"
                        >Contact</router-link
                    >
                    <router-link to="/privacy" class="footer-link"
                        >Privacy Policy</router-link
                    >
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.global-footer {
    flex-shrink: 0;
    background: #2c463f;
    color: white;
    padding: 1.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-links {
    display: flex;
    gap: 1.5rem;
}

.footer-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.2s ease;
}

.footer-link:hover {
    color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .footer-links {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
