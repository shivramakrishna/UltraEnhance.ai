import React from 'react';
import { EnhancementSettings, DenoiseLevel, EnhancementMode, SuperResolution } from '../types';
import { EnhanceButton } from './EnhanceButton';
import { Slider } from './Slider';
import { SegmentedControl } from './SegmentedControl';

interface ControlsPanelProps {
  settings: EnhancementSettings;
  setSettings: React.Dispatch<React.SetStateAction<EnhancementSettings>>;
  onEnhance: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ settings, setSettings, onEnhance, isLoading, disabled }) => {
  const handleSettingChange = <K extends keyof EnhancementSettings>(key: K, value: EnhancementSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-8 bg-black/20 backdrop-blur-2xl border border-slate-800 rounded-2xl flex flex-col gap-8 shadow-2xl shadow-black/30">
      <div>
        <label htmlFor="brightness" className="block text-sm font-medium text-slate-300 mb-2">Brightness: {settings.brightness}</label>
        <Slider
          id="brightness"
          min={0}
          max={100}
          value={settings.brightness}
          onChange={(e) => handleSettingChange('brightness', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Denoise Level</label>
        <SegmentedControl
          name="denoiseLevel"
          options={Object.values(DenoiseLevel)}
          value={settings.denoiseLevel}
          onChange={(val) => handleSettingChange('denoiseLevel', val as DenoiseLevel)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Enhancement Mode</label>
        <SegmentedControl
          name="enhancementMode"
          options={Object.values(EnhancementMode)}
          value={settings.enhancementMode}
          onChange={(val) => handleSettingChange('enhancementMode', val as EnhancementMode)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Super-Resolution</label>
        <SegmentedControl
          name="superResolution"
          options={Object.values(SuperResolution)}
          value={settings.superResolution}
          onChange={(val) => handleSettingChange('superResolution', val as SuperResolution)}
        />
      </div>
      
      <EnhanceButton onClick={onEnhance} isLoading={isLoading} disabled={disabled || isLoading} />
    </div>
  );
};

export default ControlsPanel;