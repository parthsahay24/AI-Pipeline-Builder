import React, { useState, useContext } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, XCircle, Sun, Moon } from 'lucide-react';
import { ThemeContext } from './ThemeProvider';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleSubmit = async () => {
        setIsLoading(true);
        setResult(null);

        try {
            const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';
            const response = await axios.post(`${baseUrl}/pipelines/parse`, {
                nodes: nodes,
                edges: edges
            });
            
            setResult({
                status: 'success',
                data: response.data
            });
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            setResult({
                status: 'error',
                message: error.message || 'Failed to connect to backend.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="submit-container">
            <button className="theme-toggle-btn" onClick={toggleTheme} disabled={isLoading}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            <button className="submit-btn" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                        <Play size={18} />
                    </motion.div>
                ) : (
                    <Play size={18} />
                )}
                {isLoading ? 'Analyzing...' : 'Run Pipeline'}
            </button>

            <AnimatePresence>
                {result && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 50, x: "-50%", scale: 0.9, filter: "blur(10px)", transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`result-toast ${result.status}`}
                        style={{ left: "50%" }}
                    >
                        {result.status === 'success' ? (
                            <>
                                <div className="result-toast-icon-box">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", delay: 0.1, stiffness: 200 }}>
                                        <CheckCircle size={28} />
                                    </motion.div>
                                </div>
                                <div className="result-toast-content">
                                    <div className="result-toast-header">Analysis Complete</div>
                                    <div className="result-toast-body">
                                        <div className="result-toast-row">
                                            <span style={{ color: 'var(--text-muted)' }}>Nodes Extracted:</span>
                                            <strong>{result.data.num_nodes}</strong>
                                        </div>
                                        <div className="result-toast-row">
                                            <span style={{ color: 'var(--text-muted)' }}>Graph Edges:</span>
                                            <strong>{result.data.num_edges}</strong>
                                        </div>
                                        <div className="result-toast-row">
                                            <span style={{ color: 'var(--text-muted)' }}>DAG Validity:</span>
                                            <strong style={{ color: result.data.is_dag ? 'var(--success)' : 'var(--error)' }}>
                                                {result.data.is_dag ? 'Valid' : 'Cycle Detected'}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="result-toast-icon-box">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, x: [-5, 5, -5, 5, 0] }} transition={{ type: "spring", delay: 0.1, stiffness: 200 }}>
                                        <XCircle size={28} />
                                    </motion.div>
                                </div>
                                <div className="result-toast-content">
                                    <div className="result-toast-header">Submission Failed</div>
                                    <div className="result-toast-body">
                                        <span style={{ color: 'var(--error)' }}>{result.message}</span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
                                            Verify FastAPI backend is running on port 8000.
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                        <button 
                            onClick={() => setResult(null)}
                            style={{ 
                                position: 'absolute',
                                top: '12px',
                                right: '16px',
                                background: 'transparent', 
                                border: 'none', 
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                        >
                            <XCircle size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
