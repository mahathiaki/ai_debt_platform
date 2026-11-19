import { useEffect, useState } from "react";
import { analyzeDebt } from "../services/aiService";
import Layout from "../components/Layout/Layout";
import "./AIAnalysis.css";

function AIAnalysis() {
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalysis();
    }, []);

    const fetchAnalysis = async () => {
        try {
            setLoading(true);

            const data = await analyzeDebt();

            if (data.success) {
                setAnalysis(data.analysis);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.log(err);
            setError("Unable to fetch AI analysis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="ai-page">

                <div className="ai-title">
                    <h1>🤖 AI Debt Analysis</h1>
                    <p>
                        Gemini AI analyzes your loans and provides personalized financial
                        recommendations.
                    </p>
                </div>

                <div className="ai-container">

                    {loading ? (
                        <div className="loading-card">
                            <h2>Analyzing your loans...</h2>
                            <p>Please wait while Gemini AI generates recommendations.</p>
                        </div>
                    ) : error ? (
                        <div className="error-card">
                            <h2>Error</h2>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="analysis-card">
                            <h2>Gemini AI Recommendation</h2>

                            <pre className="analysis-text">
                                {analysis}
                            </pre>

                            <button
                                className="refresh-btn"
                                onClick={fetchAnalysis}
                            >
                                🔄 Analyze Again
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </Layout>
    );
}

export default AIAnalysis;