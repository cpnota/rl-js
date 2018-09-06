module.exports = class Episodic {
  constructor(episodes) {
    if (!episodes) throw new Error('Constructor must be called with number of episodes');
    this.episodes = episodes;
    this.reset();
  }

  shouldUpdate(history) {
    if (this.isNewHistory(history)) {
      this.reset();
    }

    this.countTerminalStates(history);
    this.lastSeen = history.length - 1;
    return this.count >= this.episodes;
  }

  reset() {
    this.lastSeen = -1;
    this.count = 0;
  }

  isNewHistory(history) {
    return history.length < this.lastSeen;
  }

  countTerminalStates(history) {
    // would use history.slice(lastSeen).filter(s => s.isTerminal()),
    // but this gets called every timestep,
    // so this loop should be more efficient
    for (let t = this.lastSeen + 1; t < history.length; t += 1) {
      if (history[t].terminal) {
        this.count += 1;
      }
    }
  }
};
