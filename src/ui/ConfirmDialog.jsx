export const ConfirmDialog = ({
  show,
  onHide,
  onConfirm,
  title = "Confirmar",
  message = "¿Estás seguro?",
  confirmText = "Aceptar",
  cancelText = "Cancelar"
}) => {
  if (!show) return null;

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050
      }}
    >
      <div 
        style={{
          backgroundColor: 'var(--pomp-turquesa-claro)',
          borderRadius: '8px',
          border: '2px solid var(--pomp-turquesa)',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '500px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div 
          style={{
            backgroundColor: 'var(--pomp-turquesa)',
            borderBottom: '2px solid var(--pomp-turquesa-dark)',
            padding: '1rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h3 style={{ 
            color: 'var(--pomp-white)',
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 600
          }}>
            {title}
          </h3>
          <button 
            onClick={onHide}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--pomp-white)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0.25rem'
            }}
          >
            &times;
          </button>
        </div>
        
        {/* Body */}
        <div 
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--pomp-turquesa-claro)',
            fontSize: '0.95rem',
            lineHeight: 1.5
          }}
        >
          <p style={{ margin: 0, color: 'var(--pomp-turquesa-dark)' }}>{message}</p>
        </div>
        
        {/* Footer */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--pomp-turquesa-claro)',
            borderTop: '2px solid var(--pomp-turquesa)'
          }}
        >
          <button 
            onClick={onHide}
            style={{
              backgroundColor: 'var(--pomp-plomo-oscuro)',
              color: 'var(--pomp-white)',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--pomp-plomo-xoscuro)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--pomp-plomo-oscuro)'}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            style={{
              backgroundColor: 'var(--pomp-turquesa)',
              color: 'var(--pomp-white)',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--pomp-turquesa-dark)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--pomp-turquesa)'}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};