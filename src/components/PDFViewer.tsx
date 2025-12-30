import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { GrPrevious, GrNext } from 'react-icons/gr';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../styles/pdf-viewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

interface PDFViewerProps {
	file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [scale, setScale] = useState<number>(1.0);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
		setPageNumber(1);
	};

	const changePage = (offset: number) => {
		setPageNumber((prevPageNumber) => Math.min(Math.max(1, prevPageNumber + offset), numPages || 1));
	};

	const changeScale = (delta: number) => {
		setScale((prevScale) => Math.min(Math.max(0.5, prevScale + delta), 3.0));
	};

	return (
		<div className="pdf-viewer-container">
			<div className="pdf-top-bar">
				<div className="pdf-controls-group">
					<button
						onClick={() => changeScale(-0.1)}
						className="pdf-control-button"
						title="Zoom Out"
					>
						<AiOutlineZoomOut size={20} />
					</button>
					<span className="pdf-scale-text">{Math.round(scale * 100)}%</span>
					<button
						onClick={() => changeScale(0.1)}
						className="pdf-control-button"
						title="Zoom In"
					>
						<AiOutlineZoomIn size={20} />
					</button>
				</div>

				<div className="pdf-page-indicator">
					<span className="page-info-text">
						Page {pageNumber} of {numPages || '--'}
					</span>
				</div>
			</div>

			<div className="pdf-content-area">
				<div className="pdf-document-wrapper">
					<Document
						file={file}
						onLoadSuccess={onDocumentLoadSuccess}
						loading={
							<div className="pdf-loading-container">
								<div className="pdf-loading-spinner"></div>
							</div>
						}
						error={
							<div className="pdf-error-container">
								Failed to load PDF.
							</div>
						}
						className="pdf-document"
					>
						<Page
							pageNumber={pageNumber}
							scale={scale}
							renderTextLayer={true}
							renderAnnotationLayer={true}
							className="pdf-page"
						/>
					</Document>
				</div>
			</div>

			<div className="pdf-bottom-nav">
				<button
					onClick={() => changePage(-1)}
					disabled={pageNumber <= 1}
					className="pdf-nav-button"
				>
					<GrPrevious />
				</button>
				<span className="pdf-nav-text">Navigation</span>
				<button
					onClick={() => changePage(1)}
					disabled={pageNumber >= (numPages || 1)}
					className="pdf-nav-button"
				>
					<GrNext />
				</button>
			</div>
		</div>
	);
};

export default PDFViewer;
