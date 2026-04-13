import { Navbar } from '../components/Navbar';

function Idea() {
    return (
        <div className="page dark-theme">
            <Navbar />
            <h1 style={{ color: 'var(--text-color)', textAlign: 'center', marginTop: '4rem' }}>Idea Page</h1>
            <p style={{ color: 'var(--text-color)', padding: '0 2rem', marginTop: '2rem' }}>
                {/* Add your idea/content here */}
                Share your innovative ideas with us. We're always looking for fresh concepts.
            </p>
        </div>
    );
}

export default Idea;
