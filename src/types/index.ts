export interface Player {
  id: string;
  name: string;
  avatar?: string;
  isSelected?: boolean;
}

export interface Challenge {
  id: string;
  playerName: string;
  type: 'truth' | 'dare';
  task: string;
  timestamp: Date;
}

export interface GameState {
  players: Player[];
  currentPlayer: Player | null;
  isSpinning: boolean;
  showModal: boolean;
  modalType: 'truth' | 'dare' | null;
  task: string;
  challenges: Challenge[];
}

export interface BottleProps {
  isSpinning: boolean;
  onSpinComplete: (selectedPlayer: Player) => void;
  players: Player[];
}

export interface PlayerWheelProps {
  players: Player[];
  selectedPlayer: Player | null;
}

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlayer: Player | null;
  modalType: 'truth' | 'dare' | null;
  task: string;
  onTaskChange: (task: string) => void;
  onSubmit: () => void;
  onThemeChange: (type: 'truth' | 'dare') => void;
} 