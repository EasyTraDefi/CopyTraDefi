import BlockExplorer from '@/components/blockExplorer/blockExplorer';

export default function BlockExplorerPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Block Explorer</h1>
            <BlockExplorer />
        </div>
    );
}
