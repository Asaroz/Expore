export function wildcardEndpoint(req,res) {
    res.status(404);
    res.send({ error: "Not found" });
}

export function globalErrorHandler(err, req, res) {
    console.error("Global Error Handler intercepted an error!", err.stack);
    res.status(500);
    res.send({ message: err.message });
}