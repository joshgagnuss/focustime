import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton'
import { Timing } from './Timing'
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors'

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted ] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = () => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd(focusSubject);
  }

 return (
  <View style={styles.container}>
    <View style={styles.countdown}>
    <Countdown minutes={minutes} isPaused={!isStarted} 
    onProgress={setProgress} 
    onEnd={onEnd}
    />
    <View style={{ paddingTop: spacing.lg}}>
    <Text style={styles.title}>Focusing on:</Text>
    <Text style={styles.task}>{focusSubject}</Text>
    </View>
    </View>

    <View style={{ paddingTope: spacing.sm}}>
      <ProgressBar color={colors.progressBar} style={{ height: spacing.sm }} progress={progress} />
    </View>
    
    <View style={styles.buttonWrapper}>
    {!isStarted && <RoundedButton title='Start' size={100} onPress={() => setIsStarted(true)} />}
    {isStarted && <RoundedButton title='Pause' size={100} onPress={() => setIsStarted(false)} />}
    </View>

    <View style={styles.timingWrapper}>
      <Timing onChangeTime={setMinutes} />
    </View>

    <View style={styles.clearSubject}>
      <RoundedButton size={50} title="Clear" onPress={clearSubject} />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection:'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    padding: spacing.md,
  },
  title:{
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    textAlign: 'center'
  },
  clearSubject: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});