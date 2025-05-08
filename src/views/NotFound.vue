<template>
    <div class="not-found-container">
        <div class="error-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                The page you are looking for does not exist or has been moved.
            </p>
            <router-link to="/" class="back-button">Back to Home</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped>
.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    text-align: center;
}

.error-content {
    max-width: 500px;
    padding: 2rem;
}

h1 {
    font-size: 6rem;
    margin-bottom: 0;
    color: #e53e3e;
}

h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 1rem;
}

p {
    margin-bottom: 2rem;
    color: #718096;
}

.back-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #2c463f;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    font-weight: 600;
    transition: background-color 0.3s;
    border: 1px solid #f8f9fa;

}

.back-button:hover {
    background-color: #f8f9fa;
    color: #2c463f;
    border: 1px solid #2c463f;
}
</style>
