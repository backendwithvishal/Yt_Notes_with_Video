import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AccordionItemProps {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  accentColor?: string;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  accentColor = 'var(--accent-violet)',
}: AccordionItemProps) {
  return (
    <div
      className="border rounded-xl transition-all duration-200 overflow-hidden"
      style={{
        backgroundColor: isOpen ? 'var(--bg-surface-2)' : 'var(--bg-surface)',
        borderColor: isOpen ? accentColor : 'var(--border-subtle)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 px-5 flex items-center justify-between gap-4 text-left font-medium text-sm sm:text-base cursor-pointer transition-colors"
        style={{ color: 'var(--text-primary)' }}
        aria-expanded={isOpen}
      >
        <span className="font-semibold">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <ChevronDown
            className="w-4 h-4"
            style={{ color: isOpen ? accentColor : 'var(--text-muted)' }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="px-5 pb-5 pt-1 text-sm leading-relaxed border-t"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
