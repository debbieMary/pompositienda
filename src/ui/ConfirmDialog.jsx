

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
    <div className="dopamina-dialog-overlay">
      <div className="dopamina-dialog">
        <div className="dopamina-dialog-header">
          <h3 style={{ 
            color: 'var(--pomp-white)',
            margin: 0,
            fontSize: '1.2rem'
          }}>{title}</h3>
          <button 
            className="dopamina-close-btn" 
            onClick={onHide}
          >
            &times;
          </button>
        </div>
        
        <div className="dopamina-dialog-body">
          <p style={{ margin: 0 }}>{message}</p>
        </div>
        
        <div className="dopamina-dialog-footer">
          <button 
            className="dopamina-btn-cancel"
            onClick={onHide}
          >
            {cancelText}
          </button>
          <button 
            className="dopamina-btn-confirm"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};