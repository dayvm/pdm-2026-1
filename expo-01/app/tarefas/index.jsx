import { useTaskFilter } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import {
  adicionarTarefa,
  getTarefas,
  atualizarTarefa,
  removerTarefa,
} from "@/api";

export default function TarefasPage() {
  const isEnabled = useTaskFilter((state) => state.isEnabled);
  const toggleSwitch = useTaskFilter((state) => state.toggleSwitch);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [descricao, setDescricao] = useState("");

  // 🔍 GET
  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: async () => {
      try {
        return await getTarefas();
      } catch (e) {
        console.log("ERRO GET:", e.response?.data || e.message);
        throw e;
      }
    },
  });

  // ➕ POST
  const addMutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (e) => {
      console.log("ERRO POST:", e.response?.data || e.message);
    },
  });

  // ✏️ PUT
  const updateMutation = useMutation({
    mutationFn: ({ objectId, concluida }) =>
      atualizarTarefa(objectId, { concluida }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (e) => {
      console.log("ERRO PUT:", e.response?.data || e.message);
    },
  });

  // 🗑️ DELETE
  const deleteMutation = useMutation({
    mutationFn: removerTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
    onError: (e) => {
      console.log("ERRO DELETE:", e.response?.data || e.message);
    },
  });

  const tasks = isEnabled ? data?.filter((t) => !t.concluida) : data;

  async function handleAdicionarTarefaPress() {
    if (descricao.trim() === "") {
      Alert.alert("Descrição inválida", "Preencha a descrição da tarefa");
      return;
    }

    addMutation.mutate({
      descricao: descricao.trim(),
      concluida: false, // ✅ obrigatório
    });

    setDescricao("");
  }

  return (
    <View style={styles.container}>
      {(isFetching ||
        addMutation.isPending ||
        updateMutation.isPending ||
        deleteMutation.isPending) && (
        <ActivityIndicator size="large" />
      )}

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Button title="Adicionar Tarefa" onPress={handleAdicionarTarefaPress} />

      <View style={styles.hr} />

      <View style={styles.tasksContainer}>
        {data?.map((t) => (
          <View key={t.objectId} style={styles.taskRow}>
            <Switch
              value={t.concluida}
              onValueChange={(value) =>
                updateMutation.mutate({
                  objectId: t.objectId,
                  concluida: value,
                })
              }
            />

            <Text style={t.concluida ? styles.strikethroughText : undefined}>
              {t.descricao}
            </Text>

            <TouchableOpacity onPress={() => deleteMutation.mutate(t.objectId)}>
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))} 
      </View>

      <View style={styles.switchContainer}>
        <Text>Filtrar as concluídas: </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.hr} />

      <View style={styles.tasksContainer}>
        {tasks?.map((t) => (
          <Pressable
            key={t.objectId}
            onPress={() => router.push(`/tarefas/${t.objectId}`)}
          >
            <Text style={t.concluida ? styles.strikethroughText : undefined}>
              {t.descricao}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tasksContainer: {
    width: "100%",
    paddingLeft: 15,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    marginBottom: 5,
    padding: 5,
  },
  hr: {
    height: 1,
    backgroundColor: "black",
    width: "95%",
    marginVertical: 10,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
});