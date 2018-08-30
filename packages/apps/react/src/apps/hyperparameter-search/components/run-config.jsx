import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { generateGridSearchTasks, generateRandomSearchTasks } from '../actions/search-tasks';

const DEFAULT_EPISODES = 30;
const DEFAULT_TRIALS = 5;
const DEFAULT_STEPS = 5;
const DEFAULT_SAMPLES = 100;

const onChange = setter => (e) => {
  const { value } = e.target;
  setter(value && parseInt(value, 10));
};

const RunConfig = ({
  queueTasks,
  episodes,
  setEpisodes,
  trials,
  setTrials,
  searchType,
  setSearchType,
  steps,
  setSteps,
  samples,
  setSamples,
  beginSearch,
}) => (
  <Form onSubmit={
    () => {
      if (!trials) setTrials(DEFAULT_TRIALS);
      if (!episodes) setEpisodes(DEFAULT_EPISODES);
      queueTasks(trials || DEFAULT_TRIALS, episodes || DEFAULT_EPISODES, beginSearch);
    }}
  >
    <Button.Group onClick={e => e.preventDefault()}>
      <Button positive={searchType === 'grid'} onClick={() => setSearchType('grid')}>Grid</Button>
      <Button.Or />
=
      <Button positive={searchType === 'random'} onClick={() => setSearchType('random')}>Random</Button>
    </Button.Group>
    {
      searchType === 'grid' ? (
        <Form.Field>
          <label htmlFor="steps">
            Grid Size
            <input
              id="steps"
              value={steps || ''}
              onChange={onChange(setSteps)}
              placeholder={DEFAULT_STEPS}
            />
          </label>
        </Form.Field>
      ) : (
        <Form.Field>
          <label htmlFor="samples">
            Samples
            <input
              id="samples"
              value={samples || ''}
              onChange={onChange(setSamples)}
              placeholder={DEFAULT_SAMPLES}
            />
          </label>
        </Form.Field>
      )
    }
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
    <Form.Button primary type="submit">Run</Form.Button>
  </Form>
);

RunConfig.propTypes = {
  beginSearch: PropTypes.func.isRequired,
  episodes: PropTypes.number,
  queueTasks: PropTypes.func.isRequired,
  samples: PropTypes.number.isRequired,
  searchType: PropTypes.string.isRequired,
  setEpisodes: PropTypes.func.isRequired,
  setSamples: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  setSteps: PropTypes.func.isRequired,
  setTrials: PropTypes.func.isRequired,
  steps: PropTypes.number.isRequired,
  trials: PropTypes.number,
};

RunConfig.defaultProps = {
  episodes: undefined,
  trials: undefined,
};

const mapStateToProps = (state, { queueTasks }) => ({
  episodes: state.config.episodes || undefined,
  trials: state.config.trials || undefined,
  queueTasks: (trials, episodes, beginSearch) => {
    const tasks = state.config.searchType === 'grid'
      ? generateGridSearchTasks({
        agent: state.config.agent,
        environment: state.config.environment,
        definitions: state.config.definitions,
        gridSize: state.config.steps,
        episodes,
        trials,
      })
      : generateRandomSearchTasks({
        agent: state.config.agent,
        environment: state.config.environment,
        definitions: state.config.definitions,
        samples: state.config.samples,
        episodes,
        trials,
      });

    beginSearch(tasks);
    return queueTasks(tasks);
  },
  searchType: state.config.searchType || 'grid',
  steps: state.config.steps,
  samples: state.config.samples,
});

const mapDispatchToProps = dispatch => ({
  setEpisodes: episodes => dispatch(actions.setEpisodes(episodes)),
  setTrials: trials => dispatch(actions.setTrials(trials)),
  setSearchType: type => dispatch(actions.setSearchType(type)),
  setSteps: steps => dispatch(actions.setSteps(steps)),
  setSamples: samples => dispatch(actions.setSamples(samples)),
  beginSearch: tasks => dispatch(actions.beginSearch(tasks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunConfig);
