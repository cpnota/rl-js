import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const DEFAULT_EPISODES = 30;
const DEFAULT_TRIALS = 20;

const onChange = setter => (e) => {
  const { value } = e.target;
  setter(value && parseInt(value, 10));
};

const RunConfig = ({
  queueTasks, episodes, setEpisodes, trials, setTrials,
}) => (
  <Form onSubmit={
    () => {
      if (!trials) setTrials(DEFAULT_TRIALS);
      if (!episodes) setEpisodes(DEFAULT_EPISODES);
      queueTasks(trials || DEFAULT_TRIALS, episodes || DEFAULT_EPISODES);
    }}
  >
    <Form.Field>
      <label htmlFor="trials">
        Trials
        <input
          id="trials"
          placeholder={DEFAULT_TRIALS}
          value={trials || ''}
          onChange={onChange(setTrials)}
        />
      </label>
    </Form.Field>
    <Form.Field>
      <label htmlFor="episodes">
        Episodes
        <input
          id="episodes"
          placeholder={DEFAULT_EPISODES}
          value={episodes || ''}
          onChange={onChange(setEpisodes)}
        />
      </label>
    </Form.Field>
    <Form.Button primary content="submit">Run</Form.Button>
  </Form>
);

RunConfig.propTypes = {
  queueTasks: PropTypes.func.isRequired,
  episodes: PropTypes.number,
  setEpisodes: PropTypes.func.isRequired,
  trials: PropTypes.number,
  setTrials: PropTypes.func.isRequired,
};

RunConfig.defaultProps = {
  episodes: undefined,
  trials: undefined,
};

const mapStateToProps = (state, { queueTasks }) => ({
  episodes: state.episodes || undefined,
  trials: state.trials || undefined,
  queueTasks: (trials, episodes) => queueTasks(new Array(trials).fill({
    type: 'standard',
    payload: {
      agent: state.agent,
      environment: state.environment,
      hyperparameters: state.hyperparameters,
      episodes,
    },
  })),
});

const mapDispatchToProps = dispatch => ({
  setEpisodes: episodes => dispatch(actions.setEpisodes(episodes)),
  setTrials: trials => dispatch(actions.setTrials(trials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunConfig);
